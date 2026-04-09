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
}

export default nextConfig
