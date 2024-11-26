<script setup lang="ts">
const sales = [
  {
    user: {
      name: "Jordan Brown",
      email: "jordan.brown@sentiair.io",
      avatar: {
        src: "https://i.pravatar.cc/128?u=0",
      },
    },
    price: 79,
  },
  {
    user: {
      name: "Jordan Brown",
      email: "jordan.brown@sentiair.io",
      avatar: {
        src: "https://i.pravatar.cc/128?u=0",
      },
    },
    price: 79,
  },
];

const formatNumber = new Intl.NumberFormat("en", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
}).format;
</script>

<template>
  <UDashboardCard
    title="Recent sales"
    description="You made 128 sales this month."
    icon="i-heroicons-chart-bar-20-solid"
  >
    <NuxtLink
      v-for="(sale, index) in sales"
      :key="index"
      class="px-3 py-2 -mx-2 last:-mb-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer flex items-center gap-3 relative"
    >
      <UAvatar v-bind="sale.user.avatar" :alt="sale.user.name" size="md" />

      <div class="text-sm flex-1">
        <div>
          <p class="text-gray-900 dark:text-white font-medium">
            {{ sale.user.name }}
          </p>
          <p class="text-gray-500 dark:text-gray-400">
            {{ sale.user.email }}
          </p>
        </div>
      </div>

      <p class="text-gray-900 dark:text-white font-medium text-lg">
        {{ formatNumber(sale.price) }}
      </p>
    </NuxtLink>
  </UDashboardCard>
</template>
