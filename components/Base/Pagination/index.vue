<template>
  <div class="flex flex-col gap-6">
    <Pagination
      v-slot="{ page }"
      :items-per-page="itemPerPage"
      :total="totalData"
      :default-page="defaultPage"
    >
      <PaginationContent v-slot="{ items }">
        <PaginationPrevious @click="actionPrev"/>

        <template v-for="(item, index) in items" :key="index">
          <PaginationItem
            v-if="item.type === 'page'"
            :value="item.value"
            :is-active="item.value === page"
             @click="currentPage = item.value"
          >
            {{ item.value }}
          </PaginationItem>
        </template>

        <PaginationEllipsis :index="4" />

        <PaginationNext @click="actionNext"/>
      </PaginationContent>
    </Pagination>
  </div>
</template>

<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const props = defineProps<{
  defaultPage:number,
  totalData:number,
  itemPerPage:number,
}>()

const emit = defineEmits<{
  (e: 'changePage', page: number): void
}>()

const currentPage = ref(props.defaultPage)

watch(currentPage, (val) => {
  emit('changePage', val)
})

// --- METHOD ---
const actionPrev = ()=>{
  return currentPage.value>0 ?currentPage.value-- : 1  
}

const actionNext = ()=>{
  const lastPage = props.totalData/props.itemPerPage
  return currentPage.value<lastPage ?currentPage.value++ : currentPage.value=lastPage  
}
</script>