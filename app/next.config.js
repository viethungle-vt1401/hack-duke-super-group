/** @type {import('next').NextConfig} */

module.exports = { async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.APP_API_URL + "/:path*"
      }
    ]
  }
}