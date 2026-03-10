<script setup lang="ts">
const props = defineProps<{
  value: number;
}>();

const radius = 8;
const circumference = 2 * Math.PI * radius;

const offset = computed(() => {
  return circumference - (props.value / 100) * circumference;
});
</script>

<template>
  <div class="flex items-center gap-1.5 text-small">
    <svg width="19" height="19" viewBox="0 0 20 20" class="-rotate-90">
      <!-- background ring -->
      <circle
        cx="10"
        cy="10"
        :r="radius"
        stroke="currentColor"
        stroke-opacity="0.15"
        stroke-width="2"
        fill="transparent"
      />

      <!-- progress ring -->
      <circle
        cx="10"
        cy="10"
        :r="radius"
        stroke="currentColor"
        stroke-width="2"
        fill="transparent"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        class="transition-all duration-300"
      />
    </svg>

    <span>{{ value }}%</span>
  </div>
</template>
