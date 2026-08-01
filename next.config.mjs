/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      '@/*': ['./*'],
    },
  },
};

export default nextConfig;
