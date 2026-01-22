/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    optimizeFonts: false,
    images: {
        unoptimized: true,
        domains: ['localhost', 'arwaeduc.enovazoneacadimeca.com'],
    },
    output: 'export',
    eslint: {
        ignoreDuringBuilds: true,
    },
}

module.exports = nextConfig
