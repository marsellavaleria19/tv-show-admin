<template>
  <div class="pb-[16px] bg-white h-20">
    <div class="container mx-auto py-4">
      <div class="flex justify-between">
        <BaseBreadcrumb :navigations="navigations" />
        <BaseDropdownMenu>
          <template #trigger>
            <Button class="bg-white"
              ><img
                :src="profile?.image"
                alt="profile"
                width="50"
                height="50"
                class="mr-2 rounded-full"
              />{{ profile?.name }}</Button
            >
          </template>
          <DropdownMenuItem
            class="!min-h-[35px] flex items-center justify-between px-2"
          >
            <span>Logout</span>
            <LogOutIcon />
          </DropdownMenuItem>
        </BaseDropdownMenu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DropdownMenuItem from "~/components/ui/dropdown-menu/DropdownMenuItem.vue";
import { LogOutIcon } from "lucide-vue-next";

const props = defineProps<{
  profile?: { image:string; name:string };
  navigations: any[];
}>();
</script>
