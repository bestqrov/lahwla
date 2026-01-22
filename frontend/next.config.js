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
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3001/api/:path*',
            },
        ];
    },
}

module.exports = nextConfig
