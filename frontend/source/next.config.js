/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizeFonts: true,
    },
    env: {
        API_ORIGIN: "http://localhost:3000/",
    },
};

module.exports = nextConfig;