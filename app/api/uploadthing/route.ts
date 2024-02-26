import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    logLevel: 'error',
    uploadthingSecret: process.env.UPLOADTHING_SECRET,
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    callbackUrl: '/api/uploadthing',
  },
});

