<script setup lang="ts">
import type { CategoryId } from '@/data/types'
import { useMediaQuery } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'

const isDesktop = useMediaQuery('(min-width: 1024px)')

const navOpen = ref(isDesktop.value)
const cartOpen = ref(isDesktop.value)
const selectedCategory = ref<CategoryId | ''>('')
const selectedItems = reactive<Record<string, number>>({})

const itemCount = computed(() =>
  Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0),
)

function updateItemQty(id: string, qty: number) {
  if (qty <= 0)
    delete selectedItems[id]
  else
    selectedItems[id] = qty
}

function deleteItem(id: string) {
  delete selectedItems[id]
}
</script>

<template>
  <div class="flex flex-1">
    <AppSidebar v-model:open="navOpen" />

    <ProductBrowser
      v-model:selected-category="selectedCategory"
      :selected-items="selectedItems"
      :item-count="itemCount"
      @update:item-qty="updateItemQty"
      @toggle-nav="navOpen = !navOpen"
      @toggle-cart="cartOpen = !cartOpen"
    />

    <OrderSidebar
      v-model:open="cartOpen"
      :selected-items="selectedItems"
      @delete-item="deleteItem"
    />
  </div>
</template>
