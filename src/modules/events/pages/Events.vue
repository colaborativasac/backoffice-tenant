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
import { Card } from '@/components/ui/card'
</script>
<template>
  <Container variant="fixed">
    <Toolbar>
      <ToolbarHeading>
        <ToolbarTitle />
        <ToolbarDescription>Manage your events efficiently</ToolbarDescription>
      </ToolbarHeading>
      <ToolbarActions>
        <div>lorem</div>
      </ToolbarActions>
    </Toolbar>
  </Container>
  <Container>
    <Card>
      <EventsTable />
    </Card>
  </Container>
</template>
