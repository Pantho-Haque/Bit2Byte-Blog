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
            hostname: '88.222.244.211',
            port: '8080',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'img.icons8.com',
            port: '',
            pathname: '/**',
        },
        {
            protocol: 'https',
            hostname: 'i.postimg.cc',
            pathname: '/**',
            port: '',
        },
    
    ],
    },
};

export default nextConfig;