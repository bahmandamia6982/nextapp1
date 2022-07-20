/** @type {import('next').NextConfig} */

const withGraphQL = require('next-plugin-graphql');

const nextConfig = withGraphQL({
  reactStrictMode: true,
});

module.exports = nextConfig;
