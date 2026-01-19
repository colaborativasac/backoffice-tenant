<script setup lang="ts">
import { Container } from '@/shared/components/common/container'
import { Toolbar, ToolbarHeading, ToolbarActions } from '@/shared/components/common/toolbar'
</script>
<template>
  <Container variant="fixed">
    <Toolbar>
      <ToolbarHeading>
        <ToolbarTitle />
        <ToolbarDescription>Lista de códigos de descuentos registrados</ToolbarDescription>
      </ToolbarHeading>
      <ToolbarActions>
        <Button variant="primary">New Order</Button>
      </ToolbarActions>
    </Toolbar>
  </Container>
</template>
