/** @type {import('next').NextConfig} */

const crypto = require("crypto");

const PackageJson = require("./package.json");

function createBuildHash() {
  const hash = crypto.createHash("md5");
  const update = hash.update(PackageJson.version);
  const digest = update.digest("hex");

  return digest.slice(0, 12);
}

const now = new Date();
const timestamp = now.getTime();

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {},
  webpack: (config, { buildId, webpack }) => {
    const environment = process.env.NODE_ENV;
    const isDevelopment = environment === "development";
    const isProduction = environment === "production";

    const buildHash = createBuildHash();

    config.plugins.unshift(
      new webpack.DefinePlugin({
        DEVELOPER_TOOLS_ENABLED: JSON.stringify(isDevelopment),
        NODE_ENVIRONMENT: JSON.stringify(environment),
        BUILD_ID: JSON.stringify(buildId),
        BUILD_HASH: JSON.stringify(buildHash),
        BUILD_VERSION: JSON.stringify(PackageJson.version),
        BUILD_TIMESTAMP: JSON.stringify(timestamp),
        BUILD_DATE: JSON.stringify(now.toISOString())
      })
    );

    return config;
  }
};

module.exports = nextConfig;
