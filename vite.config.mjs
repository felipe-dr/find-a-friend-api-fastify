import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/use-cases/**/*.{spec,test}.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['src/**/http/controllers/**/*.{spec,test}.ts'],
          environment: `./prisma/vitest-environment-prisma/prisma-test-environment.ts`,
          teardown: 'process',
        },
      },
    ],
  },
})
