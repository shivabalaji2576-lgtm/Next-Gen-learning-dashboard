/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  ...(isProd
    ? {
        basePath: "/Next-Gen-learning-dashboard",
        assetPrefix: "/Next-Gen-learning-dashboard/",
      }
    : {}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
