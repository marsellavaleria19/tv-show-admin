<template>
  <div class="flex items-center">
       <img :src="logo" alt="logo"  width="50" height="50" class="shrink-0 mr-2"/>
    <div>
      <h1
        class="font-roboto text-[16px] font-bold uppercase text-white"
      >
        TV Show
      </h1>
      <h2 class="font-roboto text-[12px] text-white font-normal">
        Web Admin
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
  import logo from '@/assets/logo/logo.png'
</script>
