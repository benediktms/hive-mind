/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URI: process.env.NEXT_PUBLIC_API_URI,
  },
};

export default nextConfig;
