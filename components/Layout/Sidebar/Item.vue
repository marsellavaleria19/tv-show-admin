<template>
  <nuxt-link
    :to="{ path: link }"
    class="flex w-full min-w-[100px] items-center justify-between rounded-lg px-[15px] py-[10px] hover:bg-gray-500 hover:font-bold hover:text-white"
    active-class="bg-gray-500 font-bold"
  >
    <div class="flex w-full items-center">
      <component
        :is="getIcon(icon)"
        class="stroke-white stroke-2 group-hover:stroke-gray-100 mr-3 text-[20px]"
      />
      <label
        class="cursor-pointer font-lato text-[14px] text-white line-clamp-2 font-semibold"
      >
        {{ label }}
      </label>
    </div>
    <ChevronRight v-if="isShowArrow" class="stroke-white" />
  </nuxt-link>
</template>

<script setup lang="ts">
import { ChevronRight,DatabaseIcon,HomeIcon,SettingsIcon } from "lucide-vue-next";
import { useStoreLayoutItem } from "~/store/layout-item";

const props = defineProps<{
  label: string;
  icon: string;
  link: string;
  isShowArrow: boolean;
}>();

const iconMap = {
  HomeIcon: HomeIcon,
  DatabaseIcon: DatabaseIcon,
  SettingsIcon: SettingsIcon,
} as const

//--- STORE---
const store = useStoreLayoutItem();

// --- COMPUTED ---
const pageActive = computed(() => {
  return store.page;
});

// --- METHOD ---
const getIcon = (icon: string) =>
  iconMap[icon as keyof typeof iconMap]

// import ChevronRight from '~/assets/icon/chevron-right.svg?inline'

// export default {
//   name: 'ItemSidebar',
//   components: {
//     ChevronRight,
//   },
//   props: {
//     label: {
//       type: String,
//       default: 'item',
// },
// icon: {
//   type: String,
//   default: '',
// },
// link: {
//   type: String,
//   default: '#',
// },
// isShowArrow: {
//   type: Boolean,
//   default: true,
// },
// },
//   computed: {
//     pageActive() {
//       return
//     },
//   },
// }
</script>

<style scoped>
a.nuxt-link-active {
  background-color: green;
  color: white;
  font-weight: 700;
  /* @apply bg-green-700 p-2 font-bold text-white !important; */
}
</style>
