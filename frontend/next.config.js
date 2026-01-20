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
                // Use NEXT_PUBLIC_API_URL when provided (production), fall back to localhost for dev
                destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/:path*`,
            },
        ];
    },
}

module.exports = nextConfig
