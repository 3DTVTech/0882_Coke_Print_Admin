/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/app/2024/coke-print/dashboard",
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    API_BASE: "https://www.gforcesolution.com/app/2024/coke-print/api",
    ADMIN_ACCESS_TOKEN_KEY: "admin-coke-printing",
  },

  images: {
    unoptimized: true,
    domains: ["*"],
  },
  output: "export",

  exportPathMap: async function () {
    const paths = {
      //static page
      "/": { page: "/" },
      "/sign-in": { page: "/sign-in" },
    };
    return paths;
  },
};

export default nextConfig;
