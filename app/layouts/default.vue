<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();
const { isHelpSlideoverOpen } = useDashboard();

const links = [
  {
    id: "home",
    label: "Dashboard",
    icon: "i-heroicons-squares-2x2",
    to: "/",
    tooltip: {
      text: "Home",
      shortcuts: ["G", "H"],
    },
  },
  {
    id: "inbox",
    label: "AirMap",
    icon: "i-heroicons-globe-asia-australia",
    to: "/inbox",
    tooltip: {
      text: "AirMap",
      shortcuts: ["G", "I"],
    },
  },
  {
    id: "users",
    label: "Users",
    icon: "i-heroicons-user-group",
    to: "/users",
    tooltip: {
      text: "Users",
      shortcuts: ["G", "U"],
    },
  },
  {
    id: "settings",
    label: "Settings",
    to: "/settings",
    icon: "i-heroicons-cog-8-tooth",
    children: [
      {
        label: "General",
        to: "/settings",
        exact: true,
      },
      {
        label: "Organization",
        to: "/settings/members",
      },
      {
        label: "Notifications",
        to: "/settings/notifications",
      },
    ],
    tooltip: {
      text: "Settings",
      shortcuts: ["G", "S"],
    },
  },
];

const footerLinks = [
  {
    label: "Invite people",
    icon: "i-heroicons-plus",
    to: "/settings/members",
  },
  {
    label: "Help & Support",
    icon: "i-heroicons-question-mark-circle",
    click: () => (isHelpSlideoverOpen.value = true),
  },
];

const groups = [
  {
    key: "links",
    label: "Go to",
    commands: links.map((link) => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts,
    })),
  },
];
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <!-- <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="(colors) => (defaultColors = colors)"
        /> -->

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
