<script setup lang="ts">
import Container from '@/shared/components/common/container/Container.vue'
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarTitle,
} from '@/shared/components/common/toolbar'
import { CalendarRangeUncontroller } from '@/shared/components/common/calendar'
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Megaphone } from 'lucide-vue-next'

const cards = [
  {
    id: 1,
    title: 'Por iniciar',
    description: 'Se ha registrado el evento',
    value: 0,
  },
  {
    id: 2,
    title: 'Publicado',
    description: 'Evento publicado',
    value: 70,
  },
  {
    id: 3,
    title: 'En liquidación',
    description: 'En liquidación',
    value: 15,
  },
  {
    id: 4,
    title: 'Finalizado',
    description: 'Evento finalizado',
    value: 45,
  },
  {
    id: 5,
    title: 'Retenido - en verificación',
    description: 'Retenido - en verificación',
    value: 3,
  },
  {
    id: 6,
    title: 'Pendiente de contrato',
    description: 'Pendiente de contrato',
    value: 1,
  },
]
</script>

<template>
  <Container variant="fixed">
    <Toolbar>
      <ToolbarHeading>
        <ToolbarTitle />
        <ToolbarDescription>Resumen de todos los eventos</ToolbarDescription>
      </ToolbarHeading>
      <ToolbarActions>
        <CalendarRangeUncontroller />
      </ToolbarActions>
    </Toolbar>
  </Container>
  <Container>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <Card v-for="card in cards" :key="card.id" class="@container/card">
        <CardHeader>
          <CardDescription>{{ card.title }}</CardDescription>
          <CardTitle class="text-3xl tabular-nums">{{ card.value }}</CardTitle>
          <CardAction>
            <Megaphone class="size-5 text-muted-foreground/80" />
          </CardAction>
        </CardHeader>
        <CardFooter>{{ card.description }}</CardFooter>
      </Card>
    </div>
    <div class="grid grid-cols-2 gap-4"></div>
  </Container>
</template>
