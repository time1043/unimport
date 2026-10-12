import { Unimport } from './context'

const contextRE = /\b_ctx\.([\w_]+)\b/g

export function vueTemplateAutoImport (code: string, ctx: Unimport) {
  const matches = Array.from(code.matchAll(contextRE))

  const imports = ctx.getImports()

  for (const match of matches) {
    const name = match[1]
    const item = imports.find(i => i.as === name)
    console.log({ name, item })
  }

  return code
}
