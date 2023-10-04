/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'localhost', 
            'ai-saas.vercel.app',
            'oaidalleapiprodscus.blob.core.windows.net',
            'replicate.delivery',
            'res.cloudinary.com',
            'pbxt.replicate.delivery'
        ],
    },
}

module.exports = nextConfig
