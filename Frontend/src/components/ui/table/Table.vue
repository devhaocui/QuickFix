<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <!-- NOTE: changed overflow-auto to overflow-visible. look in here if future tables have issues. -->
  <!-- <div class="relative w-full overflow-auto"> -->
  <div class="relative w-full overflow-visible">
    <table :class="cn('w-full caption-bottom text-sm', props.class)">
      <slot />
    </table>
  </div>
</template>
