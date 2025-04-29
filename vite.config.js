import { defineConfig } from 'vite';
import { qrcode } from 'vite-plugin-qrcode';

export default defineConfig({
  plugins: [qrcode()],
  base: '/facenames/',
  server: {
    host: true, // Expose to all network interfaces
    port: 5173, // Default Vite port
    open: true  // Open browser automatically
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
}); 