<template>
  <div class="sticky top-0 flex h-screen flex-col">
    <LayoutSidebarHeader class="px-6 py-7" />
    <div class="sidebar-content overflow-y-auto px-4 pt-[72px]">
        <div class="flex flex-col gap-2">
          <template v-for="menuSidebar in menu" :key="menuSidebar.path">
            <LayoutSidebarItem
              :label="menuSidebar.name"
              :icon="menuSidebar.icon"
              :link="menuSidebar.path"
              :is-show-arrow="menuSidebar.arrow"
            />
          </template>
        </div>
    </div>
    <!-- <SidebarFooter :name-user="profileName" /> -->
  </div>
</template>

<script setup lang="ts">
import { menu } from '@/constant/menu-list'
</script>
