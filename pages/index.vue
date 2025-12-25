<template>
  <div class="p-4">
    <PagePanel>
      <div class="flex mb-4">
        <h1 class="text-[16px] font-bold">Filter : </h1>
        <BaseDatePicker v-model="startDate" class="w-[240px]"/>
        <BaseDatePicker v-model="endDate" class="w-[240px]"/>
      </div>

       <div
        class="bg-white p-4 rounded-lg border border-[#022B55] mb-3"
      >
        <h3 class="font-semibold mb-2">Total Data</h3>
        <p class="text-3xl font-bold">{{ dataDashboard.totalData }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <!-- Pie Chart: Distribusi Kategori -->
        <div class="bg-white p-4 rounded-lg border border-[#022B55] rounded-lg">
          <h3 class="font-semibold mb-4">Distribusi Kategori</h3>
          <ChartPie :data-chart="dataChartCategory" />
        </div>

        <!-- Column Chart: Data per Tanggal -->
        <div class="bg-white p-4 rounded-lg border border-[#022B55] rounded-lg">
          <h3 class="font-semibold mb-2">Agregasi Per Tanggal</h3>
          <ChartColumn :data-chart="dataChartDate"/>
        </div>
      </div>
     
    </PagePanel>
  </div>
</template>

<script setup lang="ts">
import { format, formatISO, subMonths } from "date-fns";
import { useStoreFormTvShow } from "~/store/tv-show";
import { useStoreLayoutItem } from "~/store/layout-item";

// --- STORE ---
const storeTvShow = useStoreFormTvShow();
const storeLayoutItem = useStoreLayoutItem();

// --- COMPUTED ---
const dataDashboard = computed(()=>{
  return storeTvShow.dataDashboard 
})

const dataChartCategory = computed(() => {
  return storeTvShow.dataDashboard.byCategory.map((item)=>{
     return { label: item.category, value: item.total };
  });
});

const dataChartDate = computed(()=>{
  return storeTvShow.dataDashboard.byPremierDate.map((item)=>{
    return {label:format(item.date,'dd MMM yyy'),value:item.total}
  })
})

// --- DATA ---
const startDate = ref(format(subMonths(new Date(), 1), "yyyy-MM-dd"));
const endDate = ref(format(new Date(), "yyyy-MM-dd"));

onMounted(() => {
  storeTvShow.query.startDate = ''
  storeTvShow.query.endDate = ""
  storeTvShow.getDataDashboard();
   storeLayoutItem.setNavigations([
    {
      label: "Dashboard",
      link: "/",
    },
  ]);
});

// --- WATCH ---
watch(startDate, (value) => {
  storeTvShow.query.startDate = formatISO(value)
  storeTvShow.getDataDashboard()
});

watch(endDate, (value) => {
  storeTvShow.query.endDate = formatISO(value)
  storeTvShow.getDataDashboard()
});

</script>

<style scoped>
:deep([data-slot="popover-trigger"]) {
  width: 240px;
  margin-left: 8px;
}
</style>
