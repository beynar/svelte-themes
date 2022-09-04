import { sveltekit } from "@sveltejs/kit/vite";
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: path.resolve('./src/components')
    }
  }
};

export default config;
