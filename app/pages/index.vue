<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

const { isNotificationsSlideoverOpen } = useDashboard();

// Updated menu items for air quality monitoring
const items = [
  [
    {
      label: "New Alert",
      icon: "i-heroicons-exclamation-triangle",
      to: "/alerts",
    },
    {
      label: "Add Sensor",
      icon: "i-heroicons-signal",
      to: "/sensors",
    },
    {
      label: "Export Data",
      icon: "i-heroicons-document-arrow-down",
      to: "/export",
    },
  ],
];

const range = ref<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");

// Air quality status indicators
const airQualityStatus = ref({
  overall: "Moderate",
  alerts: 3,
  activeSensors: 12,
  criticalAreas: 2,
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Air Quality Monitoring Dashboard">
        <template #right>
          <UTooltip text="Air Quality Alerts" :shortcuts="['A']">
            <UButton
              color="gray"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip
                :color="airQualityStatus.alerts > 0 ? 'red' : 'green'"
                inset
              >
                <UIcon name="i-heroicons-bell-alert" class="w-5 h-5" />
                <span v-if="airQualityStatus.alerts > 0">{{
                  airQualityStatus.alerts
                }}</span>
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdown :items="items">
            <UButton
              icon="i-heroicons-plus"
              size="md"
              class="ml-1.5 rounded-full"
            />
          </UDropdown>
        </template>
      </UDashboardNavbar>

      <!-- Quick Stats Section -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4">
        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Overall AQI</p>
              <p class="text-2xl font-bold">75</p>
            </div>
            <UIcon
              name="i-heroicons-chart-bar"
              class="w-8 h-8 text-primary-500"
            />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Active Sensors</p>
              <p class="text-2xl font-bold">
                {{ airQualityStatus.activeSensors }}
              </p>
            </div>
            <UIcon name="i-heroicons-signal" class="w-8 h-8 text-green-500" />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Critical Areas</p>
              <p class="text-2xl font-bold">
                {{ airQualityStatus.criticalAreas }}
              </p>
            </div>
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="w-8 h-8 text-yellow-500"
            />
          </div>
        </UCard>

        <UCard>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-500">Data Points Today</p>
              <p class="text-2xl font-bold">1,432</p>
            </div>
            <UIcon
              name="i-heroicons-document-chart-bar"
              class="w-8 h-8 text-blue-500"
            />
          </div>
        </UCard>
      </div>

      <UDashboardToolbar>
        <template #left>
          <HomeDateRangePicker v-model="range" class="-ml-2.5" />
          <HomePeriodSelect v-model="period" :range="range" />
        </template>
        <template #right>
          <USelectMenu
            v-model="selectedPollutant"
            :options="['PM2.5', 'PM10', 'NO2', 'O3', 'CO', 'SO2']"
            placeholder="Select Pollutant"
          />
        </template>
      </UDashboardToolbar>

      <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8 ml-4 mr-6">
        <!-- Air Quality Trends Component -->
        <HomeAirQualityTrends />
        <!-- Pollutant Distribution Map -->
        <HomeAirQualityChart />
      </div>

      <UDashboardPanelContent>
        <!-- Detailed Air Quality Chart -->
        <HomeAirQualityChart :period="period" :range="range" />
      </UDashboardPanelContent>

      <!-- Recent Alerts Section -->
      <UDashboardPanelContent>
        <div class="mt-6">
          <h3 class="text-lg font-semibold mb-4">Recent Alerts</h3>
          <UTable
            :columns="[
              { key: 'timestamp', label: 'Time' },
              { key: 'location', label: 'Location' },
              { key: 'pollutant', label: 'Pollutant' },
              { key: 'value', label: 'Value' },
              { key: 'status', label: 'Status' },
            ]"
            :rows="recentAlerts"
          />
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>

<style scoped>
.dashboard-card {
  @apply p-4 rounded-lg shadow-sm;
}
</style>
