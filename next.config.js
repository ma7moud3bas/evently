/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-alpha-sig.figma.com',
                port: '',
                pathname: '/img/**',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/dzzylglrl/**',
            },
        ],
    },
}

module.exports = nextConfig
