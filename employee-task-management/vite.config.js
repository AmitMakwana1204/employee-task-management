import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Plugin: intercept /favicon.ico requests and serve the SVG instead.
// This stops browsers from getting a blocked opaque response for the auto-requested .ico file.
const faviconPlugin = {
  name: 'favicon-ico-redirect',
  configureServer(server) {
    server.middlewares.use('/favicon.ico', (req, res) => {
      res.writeHead(301, { Location: '/favicon.svg' });
      res.end();
    });
  },
};

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    faviconPlugin,
  ],
})