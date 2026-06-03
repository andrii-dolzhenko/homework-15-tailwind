import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/homework-15-tailwind/',
  plugins: [
    tailwindcss()
  ]
});