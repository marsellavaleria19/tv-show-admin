<template>
  <h1 class="text-[20px] text-[#022B55] pb-4 font-bold">{{ props.title }}</h1>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>
