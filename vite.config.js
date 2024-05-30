import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

const viteEnv = Object.keys(process.env)
  .filter((key) => key.startsWith('VITE_'))
  .reduce((env, key) => {
    env[key] = process.env[key];
    return env;
  }, {});

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env': viteEnv, 
  },
});
