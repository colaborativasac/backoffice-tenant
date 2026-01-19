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
          :src="toAbsoluteUrl('/media/illustrations/19.svg')"
          alt=""
          class="dark:hidden max-h-40"
        />
        <img
          :src="toAbsoluteUrl('/media/illustrations/19-dark.svg')"
          alt=""
          class="hidden dark:block max-h-40"
        />
      </EmptyMedia>
      <EmptyTitle>Hemos perdido esta página</EmptyTitle>
      <EmptyDescription>
        La página que estás buscando no existe o ha sido movida.
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
