<script setup lang="ts">
import { formatPrice } from '@/utils/format'

const props = defineProps<{
  name: string
  price: number
  color?: string
  selectedColor?: string
  modelValue: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function increment() {
  emit('update:modelValue', props.modelValue + 1)
}

function decrement() {
  if (props.modelValue > 0) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
</script>

<template>
  <div
    class="flex items-start flex-col gap-2 sm:gap-3 w-full h-32 sm:h-36 lg:h-40 rounded-lg p-3 sm:p-4 text-dimmed transition-all duration-200 ease-[var(--ease-out)] active:scale-[97%]"
    :class="[
      selectedColor && `border-l-8 ${selectedColor.replace('bg-', 'border-')}`,
      modelValue > 0 && selectedColor ? selectedColor : 'bg-elevated',
    ]"
  >
    <div class="flex-1 min-w-0 w-full">
      <div class="font-medium text-sm sm:text-base truncate">
        {{ props.name }}
      </div>
      <div class="text-xs sm:text-sm">
        {{ formatPrice(props.price) }}
      </div>
    </div>

    <div class="w-full flex items-center justify-end">
      <div
        v-if="selectedColor"
        class="flex items-center gap-0.5 pl-0 sm:pl-3"
      >
        <UButton
          variant="subtle"
          color="neutral"
          size="sm"
          class="bg-transparent"
          :class="[modelValue > 0 ? 'text-black' : 'text-default']"
          icon="i-lucide-minus"
          @click="decrement"
        />
        <span
          class="w-5 sm:w-6 text-center text-xs sm:text-sm font-semibold"
          :class="modelValue > 0 ? 'text-black' : 'text-foreground'"
        >{{ modelValue }}</span>
        <UButton
          variant="subtle"
          color="neutral"
          size="sm"
          class="bg-transparent"
          :class="[modelValue > 0 ? 'text-black' : 'text-default']"
          icon="i-lucide-plus"
          @click="increment"
        />
      </div>
    </div>
  </div>
</template>
