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
  <Container variant="fixed" class="mt-6">
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam eos aliquid minima
      exercitationem illo ullam delectus cumque, fuga, rerum tenetur dolor magni et natus vel odio
      magnam nam itaque nobis?
    </p>
  </Container>
</template>
