import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

export const useTheme = () => {
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'theme',
  })

  const toggleTheme = useToggle(isDark)

  return {
    isDark,
    toggleTheme,
    theme: computed(() => (isDark.value ? 'dark' : 'light')),
  }
}
