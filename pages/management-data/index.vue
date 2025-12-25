<template>
  <ListPage :list-header="tvShowTableHeaders" :list-data="listData" :page-data="pagination" row-key="id_show" link="/management-data"/>
</template>

<script setup lang="ts">
import { useStoreLayoutItem } from '~/store/layout-item';
import { tvShowTableHeaders } from '~/constant/data-tv-show';
import { useStoreFormTvShow } from '~/store/tv-show';

// definePageMeta({
//   layout: 'main-layout'
// })

const storeFormTvShow = useStoreFormTvShow()
const storeLayoutItem = useStoreLayoutItem()

// --- COMPUTED ---
const listData = computed( ()=>{
  return storeFormTvShow.listDataTvShow
})

const pagination = computed(()=>{
  return storeFormTvShow.pagination
})

onMounted(() => {
  storeFormTvShow.getAllDataCategories()
  storeFormTvShow.getAllDataTvShow()
  storeLayoutItem.setNavigations([
    {
      label: 'Management Data',
      link: '/management-data',
    },
  ])
})
</script>
