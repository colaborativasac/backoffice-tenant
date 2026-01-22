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
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import {
  CircleCheck,
  FileClock,
  Flag,
  ListVideo,
  ShieldAlert,
  TicketPercent,
} from 'lucide-vue-next'
import { Card, CardTable, CardHeader, CardHeading, CardTitle } from '@/components/ui/card'
import { ArtistTable } from '@/modules/dashboard/components/tables'

const cards = [
  {
    id: 1,
    title: 'Por iniciar',
    description: 'Se ha registrado el evento',
    value: 0,
    icon: ListVideo,
  },
  {
    id: 2,
    title: 'Publicado',
    description: 'Evento publicado',
    value: 70,
    icon: Flag,
  },
  {
    id: 3,
    title: 'En liquidación',
    description: 'En liquidación',
    value: 15,
    icon: TicketPercent,
  },
  {
    id: 4,
    title: 'Finalizado',
    description: 'Evento finalizado',
    value: 45,
    icon: CircleCheck,
  },
  {
    id: 5,
    title: 'Retenido - en verificación',
    description: 'Retenido - en verificación',
    value: 3,
    icon: ShieldAlert,
  },
  {
    id: 6,
    title: 'Pendiente de contrato',
    description: 'Pendiente de contrato',
    value: 1,
    icon: FileClock,
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
  <Container variant="fixed">
    <div class="grid grid-cols-3 gap-4">
      <Item v-for="card in cards" :key="card.id" variant="outline">
        <ItemMedia>
          <component :is="card.icon" class="size-5" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{{ card.title }}</ItemTitle>
          <ItemDescription class="text-sm">{{ card.description }}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <div class="text-2xl tabular-nums font-semibold">{{ card.value }}</div>
        </ItemActions>
      </Item>
    </div>
    <div class="grid grid-cols-2 gap-4 mt-8">
      <Card>
        <CardHeader>
          <CardHeading>
            <CardTitle>Artistas con más eventos</CardTitle>
          </CardHeading>
        </CardHeader>
        <CardTable>
          <ScrollArea>
            <ArtistTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>
      </Card>
    </div>
  </Container>
</template>
