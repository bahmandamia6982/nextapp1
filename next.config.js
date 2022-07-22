/** @type {import('next').NextConfig} */

const withGraphQL = require('next-plugin-graphql');
const path = require('path');

const nextConfig = withGraphQL({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
});

module.exports = nextConfig;
