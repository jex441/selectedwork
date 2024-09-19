import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';
// Export routes for Next App Router
const handler = createRouteHandler({
  router: ourFileRouter,

  // Apply an (optional) custom config:
  // config: { ... },
  config: {
    token: process.env.UPLOADTHING_TOKEN,
  },
});
export { handler as GET, handler as POST };
