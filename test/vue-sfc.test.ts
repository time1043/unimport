import { describe, expect, it } from 'vitest'
import { UnimportContext } from '../src'
import { vueTemplateAutoImport } from '../src/vue-sfc'

const input = `
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
        return _openBlock(), _createElementBlock("div", _hoisted_1, [_createElementVNode(
                "h1",
                _hoisted_2,
                _toDisplayString($setup.count) + " x " + _toDisplayString(_ctx.multiplier) + " = " + _toDisplayString($setup.double),
                1
                /* TEXT */
        ), _createElementVNode("button", {
                onClick: $setup.inc,
                "data-v-inspector": "src/App.vue:14:5"
        }, "Increment")]);
}
`

describe('vue-sfc', () => {
  it('_ctx.multiplier', () => {
    const ctx = {
      imports: [
        { name: 'multiplier', from: 'foo', as: 'multiplier' }
      ]
    } as UnimportContext

    expect(vueTemplateAutoImport(input, ctx).toString())
      .toMatchInlineSnapshot(`
        "import { multiplier as __unimport_multiplier } from 'foo';
        function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
                return _openBlock(), _createElementBlock("div", _hoisted_1, [_createElementVNode(
                        "h1",
                        _hoisted_2,
                        _toDisplayString($setup.count) + " x " + _toDisplayString(__unimport_multiplier) + " = " + _toDisplayString($setup.double),
                        1
                        /* TEXT */
                ), _createElementVNode("button", {
                        onClick: $setup.inc,
                        "data-v-inspector": "src/App.vue:14:5"
                }, "Increment")]);
        }
        "
        `)
  })
})
