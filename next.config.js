/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webbasedpiggeryuploaded.sgp1.cdn.digitaloceanspaces.com",
        port: "",
        pathname: "/public/attachments/**",
      },
    ],
  },
};

module.exports = nextConfig;
