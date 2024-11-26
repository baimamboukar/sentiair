<script setup lang="ts">
import type { Mail } from "~/types";

const tabItems = [
  {
    label: "Air Quality",
  },
  {
    label: "CO2 Index",
  },
];
const selectedTab = ref(0);

const dropdownItems = [
  [
    {
      label: "Mark as unread",
      icon: "i-heroicons-check-circle",
    },
    {
      label: "Mark as important",
      icon: "i-heroicons-exclamation-circle",
    },
  ],
  [
    {
      label: "Star thread",
      icon: "i-heroicons-star",
    },
    {
      label: "Mute thread",
      icon: "i-heroicons-pause-circle",
    },
  ],
];

const { data: mails } = await useFetch<Mail[]>("/api/mails", {
  default: () => [],
});

// Filter mails based on the selected tab
const filteredMails = computed(() => {
  if (selectedTab.value === 1) {
    return mails.value.filter((mail) => !!mail.unread);
  }

  return mails.value;
});

const selectedMail = ref<Mail | null>();

const isMailPanelOpen = computed({
  get() {
    return !!selectedMail.value;
  },
  set(value: boolean) {
    if (!value) {
      selectedMail.value = null;
    }
  },
});

// Reset selected mail if it's noti in the filtered mails
watch(filteredMails, () => {
  if (!filteredMails.value.find((mail) => mail.id === selectedMail.value?.id)) {
    selectedMail.value = null;
  }
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel
      id="inbox"
      :width="400"
      :resizable="{ min: 300, max: 500 }"
    >
      <UDashboardNavbar title="Indices">
        <template #right>
          <UTabs
            v-model="selectedTab"
            :items="tabItems"
            :ui="{
              wrapper: '',
              list: {
                height: 'h-9',
                tab: { height: 'h-7', size: 'text-[13px]' },
              },
            }"
          />
        </template>
      </UDashboardNavbar>

      <!-- ~/components/inbox/InboxList.vue -->
      <InboxList v-model="selectedMail" :mails="filteredMails" />
    </UDashboardPanel>

    <UDashboardPanel v-model="isMailPanelOpen" collapsible grow side="right">
      <template v-if="selectedMail">
        <UDashboardNavbar>
          <template #toggle>
            <UDashboardNavbarToggle icon="i-heroicons-x-mark" />

            <UDivider orientation="vertical" class="mx-1.5 lg:hidden" />
          </template>

          <template #right>
            <UTooltip text="AI Insights">
              <UButton
                icon="i-heroicons-sparkles"
                color="gray"
                variant="ghost"
              />
            </UTooltip>

            <UTooltip text="Download Data">
              <UButton
                icon="i-heroicons-arrow-down-tray"
                color="gray"
                variant="ghost"
              />
            </UTooltip>

            <UDivider orientation="vertical" class="mx-1.5" />
          </template>
        </UDashboardNavbar>

        <!-- ~/components/inbox/InboxMail.vue -->
        <InboxMail :mail="selectedMail" />
        <!-- <RwandaAirQualityMap /> -->
      </template>
      <div v-else class="flex-1 hidden lg:flex items-center justify-center">
        <UIcon
          name="i-heroicons-globe-asia-australia"
          class="w-32 h-32 text-gray-400 dark:text-gray-500"
        />
      </div>
    </UDashboardPanel>
  </UDashboardPage>
</template>
