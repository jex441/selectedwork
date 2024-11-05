/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    // loader: 'custom',
    // loaderFile: 'imageLoader.ts',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
        pathname: '/f/*',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/*',
      },
    ],
  },
};
