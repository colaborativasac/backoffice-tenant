<script setup lang="ts">
import { Container } from '@/shared/components/common/container'
import {
  Toolbar,
  ToolbarHeading,
  ToolbarActions,
  ToolbarTitle,
  ToolbarDescription,
} from '@/shared/components/common/toolbar'
</script>
<template>
  <Container variant="fixed">
    <Toolbar>
      <ToolbarHeading>
        <ToolbarTitle />
        <ToolbarDescription>Manage your orders efficiently</ToolbarDescription>
      </ToolbarHeading>
      <ToolbarActions>
        <Button>New Order</Button>
      </ToolbarActions>
    </Toolbar>
  </Container>
</template>
