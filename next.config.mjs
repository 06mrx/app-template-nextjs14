
import { createRequire } from "module";
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  // disable: process.env.NODE_ENV === "development",
  disable : true
});


const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_DESC: process.env.APP_DESC,
    API: process.env.API,
    APP_ADDRESS:process.env.APP_ADDRESS,
    APP_OWNER:process.env.APP_OWNER,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "template-laravel11.test",
      },
      {
        protocol: "https",
        hostname: "generatex.death-code.site",
      },
    ],
  },  
})

export default nextConfig
