/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        'react',
        'wagmi',
        'react/jsx-runtime',
        '@web3modal/react',
        '@emotion/react',
        '@emotion/styled',
      ],
    },
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
  },
})
