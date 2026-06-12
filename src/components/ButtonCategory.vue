<script setup lang="ts">
const props = defineProps<{
  icon: string
  title: string
  description: string
  color?: string
  selected?: boolean
}>()
</script>

<template>
  <button
    class="flex flex-col text-left justify-between h-28 sm:h-36 lg:h-40 w-full rounded-lg p-3 sm:p-4 text-dimmed transition-transform duration-200 active:scale-[97%]"
    :class="[
      props.color || 'bg-red-200',
    ]"
  >
    <div>
      <UIcon :name="props.icon" class="size-6 sm:size-8" />
    </div>
    <div class="min-w-0">
      <div class="font-bold text-sm sm:text-base truncate">
        {{ props.title }}
      </div>
      <div class="text-xs sm:text-sm text-dimmed line-clamp-1 sm:line-clamp-2">
        {{ props.description }}
      </div>
    </div>
  </button>
</template>
