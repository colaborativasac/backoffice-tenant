<script setup lang="ts">
import { Container } from '@/shared/components/common/container'
import {
  Toolbar,
  ToolbarHeading,
  ToolbarActions,
  ToolbarTitle,
  ToolbarDescription,
} from '@/shared/components/common/toolbar'
import {
  Card,
  CardTitle,
  CardHeader,
  CardHeading,
  CardTable,
  CardFooter,
  CardAction,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-vue-next'
</script>
<template>
  <Container>
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
        <CardAction> </CardAction>
      </CardHeader>
      <CardTable> </CardTable>
      <CardFooter> </CardFooter>
    </Card>
  </Container>
</template>
