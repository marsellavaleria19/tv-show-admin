
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const props = defineProps<{
  align?: 'start' | 'center' | 'end'
}>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
     <slot name="trigger">
      <Button variant="outline">Admin</Button>
     </slot>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-[100px] bg-white" :align="align">
      <slot/>
    </DropdownMenuContent>
  </DropdownMenu>
</template>