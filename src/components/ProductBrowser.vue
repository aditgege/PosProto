<script setup lang="ts">
import type { CategoryId } from '@/data/types'
import { computed, nextTick, ref } from 'vue'
import { categoryMockData } from '@/data/categoryMockData'
import { productMockData } from '@/data/productMockData'

const props = defineProps<{
  selectedCategory: CategoryId | ''
  selectedItems: Record<string, number>
  itemCount: number
}>()

const emit = defineEmits<{
  'update:selectedCategory': [value: CategoryId | '']
  'update:itemQty': [id: string, qty: number]
  'toggleNav': []
  'toggleCart': []
}>()

const menuSection = ref<HTMLElement | null>(null)

const selectedCategoryColor = computed(() => {
  if (!props.selectedCategory)
    return ''
  const cat = categoryMockData.find(c => c.id === props.selectedCategory)
  return cat?.color || ''
})

const menus = computed(() => {
  const id = props.selectedCategory
  if (!id)
    return []
  return productMockData[id]
})

function selectCategory(id: CategoryId | '') {
  const next = id === props.selectedCategory ? '' : id
  emit('update:selectedCategory', next)
  if (next) {
    nextTick(() => {
      menuSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

function onItemQtyUpdate(id: string, qty: number) {
  emit('update:itemQty', id, qty)
}
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div class="h-(--ui-header-height) shrink-0 flex items-center gap-2 px-4 py-13 border-b border-default">
      <UButton
        icon="i-lucide-panel-left"
        color="neutral"
        variant="ghost"
        size="xl"
        aria-label="Toggle navigation"
        class="lg:hidden"
        @click="emit('toggleNav')"
      />

      <UInput
        placeholder="Search..."
        variant="soft"
        size="xl"
        icon="i-lucide-search"
        color="neutral"
        class="flex-1"
      />

      <UChip
        :text="itemCount"
        :show="itemCount > 0"
        color="error"
        size="lg"
        class="lg:hidden"
      >
        <UButton
          icon="i-lucide-shopping-cart"
          color="neutral"
          variant="ghost"
          size="xl"
          aria-label="Toggle cart"
          @click="emit('toggleCart')"
        />
      </UChip>
    </div>

    <div class="flex-1 p-2 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4">
      <ButtonCategory
        v-for="ctgr in categoryMockData"
        :key="ctgr.id"
        :icon="ctgr.icon"
        :title="ctgr.title"
        :color="ctgr.color"
        :description="ctgr.description"
        :selected="selectedCategory === ctgr.id"
        @click="selectCategory(ctgr.id)"
      />
    </div>

    <USeparator />

    <div
      v-if="menus.length"
      ref="menuSection"
      class="flex-1 p-2 sm:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 sm:gap-4"
    >
      <CardMenu
        v-for="menu in menus"
        :key="menu.id"
        :name="menu.name"
        :price="menu.price"
        :color="menu.color"
        :selected-color="selectedCategoryColor"
        :model-value="selectedItems[menu.id] ?? 0"
        @update:model-value="(val: number) => onItemQtyUpdate(menu.id, val)"
      />
    </div>
    <div
      v-else-if="selectedCategory"
      class="flex-1 p-4 flex items-center justify-center text-dimmed italic"
    >
      No items in this category
    </div>
    <div
      v-else
      class="flex-1 p-4 flex items-center justify-center text-dimmed italic"
    >
      Select a category to view items
    </div>
  </div>
</template>
