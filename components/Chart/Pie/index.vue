<script setup lang="ts">
  const props = defineProps<{
    dataChart:DataChart[]
  }>()

 
  interface DataChart {
    label:string,
    value:number
  }
const labels = computed(() =>
  props.dataChart?.length ? props.dataChart.map(item => item.label) : []
)
const series = computed(() =>
  props.dataChart?.length ? props.dataChart.map(item => item.value) : []
)

const options = computed(() => ({
  chart: { type: 'pie' },
  labels: labels.value
}))
</script>

<template>
    <VueApexCharts class="w-[500px] h-[500px]" type="pie" :series="series" :options="options" />
</template>
