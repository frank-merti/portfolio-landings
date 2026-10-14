const isGhPages = process.env.GITHUB_PAGES === 'true'
const repo = process.env.REPO_NAME || 'portfolio-landings'
const basePath = isGhPages ? `/${repo}/02-saas-next` : ''

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGhPages && {
    output: 'export',
    basePath,
    images: { unoptimized: true },
  }),
}
module.exports = nextConfig
