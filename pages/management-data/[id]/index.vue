<template>
   <DetailPage title="Detail Acara TV" :detail="dataDetail" link="/"/>
</template>

<script setup lang="ts">
import { useStoreLayoutItem } from '~/store/layout-item';
import { useStoreFormTvShow } from '~/store/tv-show';


const route = useRoute()

// --- STORE ---
const storeFormTvShow = useStoreFormTvShow()
const storeLayoutItem = useStoreLayoutItem()

// --- COMPUTED ---
const dataDetail = computed( ()=>{
  return storeFormTvShow.detailTvShow
})

onMounted(() => {
  storeFormTvShow.getAllDataCategories()
  storeFormTvShow.getDataTvShowById(route.params.id as string)
  storeLayoutItem.setNavigations([
    {
      label: 'Management Data',
      link: '/',
    },
  ])
})
</script>
