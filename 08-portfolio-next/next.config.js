const isGhPages = process.env.GITHUB_PAGES === 'true'
const repo = process.env.REPO_NAME || 'portfolio-landings'
const basePath = isGhPages ? `/${repo}/08-portfolio-next` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: isGhPages,
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }]
  },
  ...(isGhPages && {
    output: 'export',
    basePath
  })
}
module.exports = nextConfig
