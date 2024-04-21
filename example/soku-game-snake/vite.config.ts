import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import sokuGames from '@soku-games/vite-plugin';

export default defineConfig({
  plugins: [react({ tsDecorators: true }), sokuGames()],
});
