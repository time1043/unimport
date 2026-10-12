import type { Ref } from 'vue'

export function useDoubled (v: Ref<number>) {
  return computed(() => v.value * 2)
}
