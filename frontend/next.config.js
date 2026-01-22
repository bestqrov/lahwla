/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: false,
    images: {
        unoptimized: true,
        domains: ['localhost', 'arwaeduc.enovazoneacadimeca.com'],
    },
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
