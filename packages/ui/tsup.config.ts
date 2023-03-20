import type { Options } from 'tsup'

const config: Options = {
  entry: ['src/index.ts'],
  dts: true,
  sourcemap: true,
  clean: true,
  skipNodeModulesBundle: true,
  format: ['esm'],
}

export default config
