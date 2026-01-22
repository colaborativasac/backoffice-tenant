import { cva, type VariantProps } from 'class-variance-authority'
import { inject, type InjectionKey } from 'vue'

export type CardContextType = {
  variant: 'default' | 'accent'
}
export const CardContextKey: InjectionKey<CardContextType> = Symbol('CardContext')

export const useCardContext = () => {
  const context = inject(CardContextKey)
  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider')
  }
  return context
}

export const cardVariants = cva('flex flex-col items-stretch text-card-foreground rounded-xl', {
  variants: {
    variant: {
      default: 'bg-card border border-border',
      accent: 'bg-muted shadow-xs p-1',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const cardHeaderVariants = cva('flex items-center justify-between flex-wrap px-5 min-h-14', {
  variants: {
    variant: {
      default: 'border-b border-border',
      accent: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const cardContentVariants = cva('grow p-5', {
  variants: {
    variant: {
      default: '',
      accent: 'bg-card rounded-t-xl [&:last-child]:rounded-b-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const cardTableVariants = cva('grid grow', {
  variants: {
    variant: {
      default: '',
      accent: 'bg-card rounded-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export const cardFooterVariants = cva('flex items-center px-5 min-h-14', {
  variants: {
    variant: {
      default: 'border-t border-border',
      accent: 'bg-card rounded-b-xl mt-[2px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export type CardVariants = VariantProps<typeof cardVariants>
export type CardHeaderVariants = VariantProps<typeof cardHeaderVariants>
export type CardContentVariants = VariantProps<typeof cardContentVariants>
export type CardTableVariants = VariantProps<typeof cardTableVariants>
export type CardFooterVariants = VariantProps<typeof cardFooterVariants>
