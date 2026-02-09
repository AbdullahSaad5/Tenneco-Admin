/**
 * Migration Script: Seed Vehicle Types & Migrate Existing Data
 *
 * This script uses the Payload REST API to:
 * 1. Create VehicleType documents (light, commercial, rail) if they don't exist
 * 2. Migrate existing vehicle/brake/hotspot/homepage configs from string vehicleType
 *    values to relationship IDs pointing to the new VehicleTypes collection
 *
 * Usage:
 *   npx tsx src/migrations/seed-vehicle-types.ts
 *
 * Prerequisites:
 *   - The Payload admin server must be running (default: http://localhost:3001)
 *   - Set PAYLOAD_API_URL environment variable if different from default
 *   - You must have an admin user; set PAYLOAD_EMAIL and PAYLOAD_PASSWORD
 */

const API_URL = process.env.PAYLOAD_API_URL || 'http://localhost:3001/api'
const EMAIL = process.env.PAYLOAD_EMAIL || 'admin@tenneco.com'
const PASSWORD = process.env.PAYLOAD_PASSWORD || ''

// Default vehicle types to seed
const VEHICLE_TYPES = [
  {
    name: 'Light Vehicles',
    slug: 'light',
    description: 'Passenger cars and light trucks',
    order: 1,
    isActive: true,
  },
  {
    name: 'Commercial Vehicles',
    slug: 'commercial',
    description: 'Heavy-duty trucks and buses',
    order: 2,
    isActive: true,
  },
  {
    name: 'Rail',
    slug: 'rail',
    description: 'Trains and railway systems',
    order: 3,
    isActive: true,
  },
]

// Collections that have a top-level vehicleType field to migrate
const CONFIG_COLLECTIONS = [
  'vehicle-configurations',
  'brake-configurations',
  'hotspot-configurations',
]

let authToken = ''

async function apiRequest(path: string, options: RequestInit = {}): Promise<unknown> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }
  if (authToken) {
    headers['Authorization'] = `JWT ${authToken}`
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`API error ${response.status}: ${text}`)
  }

  return response.json()
}

async function login() {
  if (!PASSWORD) {
    console.log('No PAYLOAD_PASSWORD set. Trying without auth (if access control allows)...')
    return
  }

  console.log(`Logging in as ${EMAIL}...`)
  const result = await apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  }) as { token: string }

  authToken = result.token
  console.log('Logged in successfully.')
}

async function main() {
  console.log(`Using API URL: ${API_URL}`)

  await login()

  // =========================================================================
  // Step 1: Seed Vehicle Types
  // =========================================================================
  console.log('\n--- Step 1: Seeding Vehicle Types ---')

  const slugToId: Record<string, string> = {}

  for (const vt of VEHICLE_TYPES) {
    // Check if already exists
    const existing = await apiRequest(`/vehicle-types?where[slug][equals]=${vt.slug}`) as {
      docs: Array<{ id: string; slug: string }>
    }

    if (existing.docs.length > 0) {
      console.log(`  [SKIP] "${vt.name}" (slug: ${vt.slug}) already exists with ID: ${existing.docs[0].id}`)
      slugToId[vt.slug] = existing.docs[0].id
    } else {
      const created = await apiRequest('/vehicle-types', {
        method: 'POST',
        body: JSON.stringify(vt),
      }) as { doc: { id: string } }

      console.log(`  [CREATED] "${vt.name}" (slug: ${vt.slug}) with ID: ${created.doc.id}`)
      slugToId[vt.slug] = created.doc.id
    }
  }

  console.log('\nSlug -> ID mapping:')
  for (const [slug, id] of Object.entries(slugToId)) {
    console.log(`  ${slug} -> ${id}`)
  }

  // =========================================================================
  // Step 2: Migrate config collections
  // =========================================================================
  console.log('\n--- Step 2: Migrating config collections ---')

  for (const collection of CONFIG_COLLECTIONS) {
    console.log(`\nMigrating: ${collection}`)
    const response = await apiRequest(`/${collection}?depth=0&limit=100`) as {
      docs: Array<{ id: string; vehicleType: string }>
    }

    let migrated = 0
    let skipped = 0

    for (const doc of response.docs) {
      const currentValue = doc.vehicleType

      // If it's already an ObjectId-like string (24 hex chars), it's been migrated
      if (typeof currentValue === 'string' && /^[a-f0-9]{24}$/.test(currentValue)) {
        console.log(`  [SKIP] Doc ${doc.id} - appears already migrated (ObjectId reference)`)
        skipped++
        continue
      }

      // It's a slug string - map to the new ID
      if (typeof currentValue === 'string' && slugToId[currentValue]) {
        await apiRequest(`/${collection}/${doc.id}`, {
          method: 'PATCH',
          body: JSON.stringify({ vehicleType: slugToId[currentValue] }),
        })
        console.log(`  [MIGRATED] Doc ${doc.id}: "${currentValue}" -> ${slugToId[currentValue]}`)
        migrated++
      } else {
        console.log(`  [WARN] Doc ${doc.id}: Unknown vehicleType value: ${JSON.stringify(currentValue)}`)
        skipped++
      }
    }

    console.log(`  Result: ${migrated} migrated, ${skipped} skipped (total: ${response.docs.length})`)
  }

  // =========================================================================
  // Step 3: Migrate Homepage vehicleCategories
  // =========================================================================
  console.log('\n--- Step 3: Migrating Homepage vehicleCategories ---')

  const homepageResponse = await apiRequest('/homepage?depth=0&limit=10') as {
    docs: Array<{
      id: string
      vehicleCategories?: Array<{
        id: string
        vehicleType: string
        [key: string]: unknown
      }>
    }>
  }

  for (const doc of homepageResponse.docs) {
    const categories = doc.vehicleCategories || []
    let needsUpdate = false

    const updatedCategories = categories.map((cat, i) => {
      const currentValue = cat.vehicleType

      // Already an ObjectId reference
      if (typeof currentValue === 'string' && /^[a-f0-9]{24}$/.test(currentValue)) {
        console.log(`  [SKIP] Homepage ${doc.id}, category[${i}] - already migrated`)
        return cat
      }

      // It's a slug string
      if (typeof currentValue === 'string' && slugToId[currentValue]) {
        console.log(`  [MIGRATED] Homepage ${doc.id}, category[${i}]: "${currentValue}" -> ${slugToId[currentValue]}`)
        needsUpdate = true
        return { ...cat, vehicleType: slugToId[currentValue] }
      }

      console.log(`  [WARN] Homepage ${doc.id}, category[${i}]: Unknown value: ${JSON.stringify(currentValue)}`)
      return cat
    })

    if (needsUpdate) {
      await apiRequest(`/homepage/${doc.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ vehicleCategories: updatedCategories }),
      })
      console.log(`  [SAVED] Homepage ${doc.id} updated`)
    }
  }

  // =========================================================================
  // Done
  // =========================================================================
  console.log('\n--- Migration Complete ---')
  console.log('Vehicle types seeded and existing data migrated successfully.')
  console.log('Verify in the Payload admin panel that all relationships are correct.')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
