const nextConfig = {
  i18n: {
    locales: ['', 'fr', 'nl-NL', 'id-ID'],
    defaultLocale: 'id-ID',
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        "fs": false,
        "path": false,
        "os": false,
      }
    }
    return config;
  }
};

module.exports = nextConfig;