import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve('./demo'),
  server: {
    open: true
  }
});
