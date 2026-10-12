import { promises as fs } from 'fs'
import type { FilterPattern } from '@rollup/pluginutils'
import { createFilter } from '@rollup/pluginutils'
import { createUnplugin } from 'unplugin'
import { createUnimport } from './context'
import { scanDirExports } from './scan'
import { UnimportOptions } from './types'

export interface UnimportPluginOptions extends UnimportOptions {
  include: FilterPattern
  exclude: FilterPattern
  dts: boolean | string
}

export default createUnplugin<Partial<UnimportPluginOptions>>((options) => {
  const ctx = createUnimport(options)
  const filter = createFilter(
    options.include || [/\.[jt]sx?$/, /\.vue$/, /\.vue\?vue/, /\.svelte$/],
    options.exclude || [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/]
  )
  const dts = options.dts === true
    ? 'unimport.d.ts'
    : options.dts
  return {
    name: 'unimport',
    enforce: 'post',
    transformInclude (id) {
      return filter(id)
    },
    async transform (_code) {
      const { code, s } = await ctx.injectImports(_code)
      if (code === _code) {
        return
      }
      return {
        code,
        map: s.generateMap()
      }
    },
    async buildStart () {
      const dirImports = await scanDirExports('./src/composables', { fileFilter: filter })
      // console.log({ dirImports })

      // eslint-disable-next-line require-await
      await ctx.modifyDynamicImports(async (imports) => {
        imports.push(...dirImports)
      })

      if (dts) {
        return fs.writeFile(dts, ctx.generateTypeDecarations(), 'utf-8')
      }
    }
  }
})
