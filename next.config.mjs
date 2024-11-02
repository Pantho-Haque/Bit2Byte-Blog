/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: 'images.pexels.com',
            port: '',
            pathname: '/**',
        }, 
        {
            protocol: 'http',
            hostname: '130.51.120.58',
            port: '8080',
            pathname: '/**',
        }
    
    ],
    },
};

export default nextConfig;