/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/bjs-clear' : '',
  assetPrefix: isGithubActions ? '/bjs-clear/' : '',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    BUILD_DATE: new Date().toISOString().split('T')[0],
  },
}

export default nextConfig
