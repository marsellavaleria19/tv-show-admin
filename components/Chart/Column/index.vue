<template>
    <ApexChart type="bar" :options="chartOptions" :series="chartSeries" height="350" />
</template>

<script setup lang="ts">
import ApexChart from "vue3-apexcharts";
import { ref } from "vue";

const props = defineProps<{
    dataChart:DataChart[]
  }>()

interface DataChart {
    label:string,
    value:number
  }

// --- COMPUTED ---
  const labels = computed(() =>
  props.dataChart?.length ? props.dataChart.map(item => item.label) : []
)

const values = computed(() =>
  props.dataChart?.length ? props.dataChart.map(item => item.value) : []
)
const chartSeries = computed(() => [
  {
    name: "Total Shows",
    data: values.value
  }
]);
const chartOptions = computed(() => ({
  chart: { id: "myChart", type: "bar" },
  xaxis: {
    categories: labels.value || []
  },
  dataLabels: {
    enabled: false
  },
})) as any;

// Opsi chart
// const options = ref({
//   chart: {
//     id: "myChart",
//     type: "bar"
//   },
//   plotOptions: {
//     bar: {
//       horizontal: false
//     }
//   },
//   dataLabels: {
//     enabled: false
//   },
//   xaxis: {
//    categories: labels || []
//   },
//   yaxis: {
//     title: {
//       text: "Total Shows"
//     }
//   },
//   tooltip: {
//     enabled: true
//   }
// }) as any;
</script>
