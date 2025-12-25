<template>
  <div>
    <div class="flex bg-[#EDEFF3]">
      <LayoutSidebar class="fixed left-0 top-0 h-screen w-[325px] bg-[#022B55]" />
      <div class="h-full w-full">
        <LayoutHeader :navigations="navigations" :profile="profile"/>
        <div class="max-w-screen-xl px-6 py-6 2xl:max-w-full 2xl:px-10">
          <NuxtPage />
          <Toaster position="top-right" rich-colors/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// call store
import { storeToRefs } from "pinia";
import { useStoreLayoutItem } from "~/store/layout-item";
import { Toaster } from 'vue-sonner'
import logo from '@/assets/image/user.jpg'

const store = useStoreLayoutItem();
const { navigations } = storeToRefs(store);
const profile = reactive({image:'',name:''})
profile.image = logo
profile.name = 'Admin'
</script>
