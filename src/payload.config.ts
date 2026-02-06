// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Languages } from './collections/Languages'
import { Homepage } from './collections/Homepage'
import { AppSettings } from './collections/AppSettings'
import { LoadingScreens } from './collections/LoadingScreens'
import { VehicleConfigurations } from './collections/VehicleConfigurations'
import { BrakeConfigurations } from './collections/BrakeConfigurations'
import { HotspotConfigurations } from './collections/HotspotConfigurations'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      providers: ['./providers/CustomStylesProvider'],
    },
  },
  collections: [
    Users,
    Media,
    Languages,
    Homepage,
    AppSettings,
    LoadingScreens,
    VehicleConfigurations,
    BrakeConfigurations,
    HotspotConfigurations,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          // Generate direct S3 URLs instead of proxied /api/media/file/... URLs
          generateFileURL: ({ filename }) => {
            const bucket = process.env.S3_BUCKET || ''
            const region = process.env.S3_REGION || 'us-east-1'
            // If you have a CloudFront CDN, use this instead:
            // return `https://${process.env.CLOUDFRONT_DOMAIN}/${filename}`
            return `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        // New config for S3 storage
        requestHandler: {
          httpAgent: {
            maxSockets: 300,
            keepAlive: true,
          },
          httpsAgent: {
            maxSockets: 300,
            keepAlive: true,
          },
          connectionTimeout: 60 * 1000,
          requestTimeout: 60 * 1000,
        },
        // Older config for S3 storage
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION,
        disableS3ExpressSessionAuth: true,
      },
    }),
  ],
  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024, // Set file size limit to 10MB
    },
  },

  cors: {
    origins: [
      '*',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://tenneco.vercel.app',
      'https://tenneco-s2i89.ondigitalocean.app',
      'https://stingray-app-c4ljo.ondigitalocean.app',
      'https://tenneco-69z8.vercel.app',
    ],
    headers: ['*'],
  },
  csrf: [
    '*',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://tenneco.vercel.app',
    'https://tenneco-s2i89.ondigitalocean.app',
    'https://stingray-app-c4ljo.ondigitalocean.app',
    "https://tenneco-69z8.vercel.app"
  ],
})
