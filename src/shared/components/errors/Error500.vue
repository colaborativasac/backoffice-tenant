<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { toAbsoluteUrl } from '@/core/helpers'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
  EmptyMedia,
} from '@/components/ui/empty'
</script>
<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia>
        <img
          :src="toAbsoluteUrl('/media/illustrations/20.svg')"
          alt=""
          class="dark:hidden max-h-40"
        />
        <img
          :src="toAbsoluteUrl('/media/illustrations/20-dark.svg')"
          alt=""
          class="hidden dark:block max-h-40"
        />
      </EmptyMedia>
      <EmptyTitle>Algo salió mal en el servidor</EmptyTitle>
      <EmptyDescription>
        Ha ocurrido un error interno en el servidor. Por favor, intenta nuevamente más tarde.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <EmptyDescription>
        <Button as-child variant="link">
          <router-link to="/">Regresar al inicio</router-link>
        </Button>
      </EmptyDescription>
    </EmptyContent>
  </Empty>
</template>
