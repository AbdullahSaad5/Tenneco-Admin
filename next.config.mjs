import { withPayload } from '@payloadcms/next/withPayload'
// rev:sas
const nextConfig = {
  output: 'standalone',
  async headers() {
    return [
      {
        // Apply these headers to all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // Replace '*' with your specific origins if needed
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
