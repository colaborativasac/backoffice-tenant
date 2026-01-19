import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Container } from './Container.vue'

export const containerVariants = cva('w-full mx-auto px-4 lg:px-6', {
  variants: {
    variant: {
      fixed: 'max-w-[1320px]',
      fluid: '',
    },
    defaultVariants: {
      width: 'fixed',
    },
  },
})

export type ContainerVariants = VariantProps<typeof containerVariants>
