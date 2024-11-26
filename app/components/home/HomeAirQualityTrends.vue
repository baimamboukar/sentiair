<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const chartRef = ref(null);

onMounted(() => {
  const chart = echarts.init(chartRef.value);

  const option = {
    title: {
      text: "Air Quality Trends",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["PM2.5", "NO2", "O3", "CO"],
      bottom: 0,
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
      name: "Concentration (µg/m³)",
    },
    series: [
      {
        name: "PM2.5",
        type: "line",
        smooth: true,
        data: [30, 28, 35, 42, 38, 25, 27],
      },
      {
        name: "NO2",
        type: "line",
        smooth: true,
        data: [20, 25, 22, 18, 15, 17, 21],
      },
      {
        name: "O3",
        type: "line",
        smooth: true,
        data: [45, 42, 38, 35, 40, 48, 50],
      },
      {
        name: "CO",
        type: "line",
        smooth: true,
        data: [0.8, 0.7, 0.9, 1.2, 1.0, 0.8, 0.7],
      },
    ],
  };

  chart.setOption(option);
});
</script>

<template>
  <UCard>
    <div ref="chartRef" class="h-[400px]" />
  </UCard>
</template>
