<script setup lang="ts">
const teams = [
  {
    label: "Nuxt",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/23360933?s=200&v=4",
    },
    click: () => {
      team.value = teams[0];
    },
  },
  {
    label: "NuxtLabs",
    avatar: {
      src: "https://avatars.githubusercontent.com/u/62017400?s=200&v=4",
    },
    click: () => {
      team.value = teams[1];
    },
  },
];

const actions = [
  {
    label: "Create team",
    icon: "i-heroicons-plus-circle",
  },
  {
    label: "Manage teams",
    icon: "i-heroicons-cog-8-tooth",
  },
];

const team = ref(teams[0]);
</script>

<template>
  <b class="logo">SentiAir💨</b>
</template>

<style scoped>
.logo {
  font-size: 2.2rem;
  font-weight: bolder;
  color: #2cafecff;
}
</style>
