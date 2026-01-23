<script setup lang="ts">
import { Container } from '@/shared/components/common/container'
import {
  Toolbar,
  ToolbarHeading,
  ToolbarActions,
  ToolbarTitle,
  ToolbarDescription,
} from '@/shared/components/common/toolbar'
import { EventsTable } from '@/modules/events/components/tables'
import { Card, CardTitle, CardHeader, CardHeading, CardTable } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
</script>
<template>
  <Container variant="fixed">
    <Toolbar>
      <ToolbarHeading>
        <ToolbarTitle />
        <ToolbarDescription>Manage your events efficiently</ToolbarDescription>
      </ToolbarHeading>
      <ToolbarActions>
        <Button>
          <Plus />
          Crear Evento
        </Button>
      </ToolbarActions>
    </Toolbar>
  </Container>
  <Container>
    <Card>
      <CardHeader>
        <CardHeading>
          <CardTitle>Eventos</CardTitle>
        </CardHeading>
      </CardHeader>
      <CardTable>
        <EventsTable />
      </CardTable>
    </Card>
  </Container>
</template>
