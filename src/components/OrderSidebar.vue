<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { AnimatePresence, motion } from 'motion-v'
import { computed, reactive, ref } from 'vue'
import { getProductById } from '@/data/productMockData'
import { formatPrice } from '@/utils/format'

const props = defineProps<{
  open: boolean
  selectedItems: Record<string, number>
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'deleteItem': [id: string]
}>()

const sidebarOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit('update:open', val),
})

const selectedEntries = computed(() => Object.entries(props.selectedItems))

// Order summary calculations
const TAX_RATE = 0.11 // 11% PPN
const SERVICE_RATE = 0.05 // 5% service charge

const itemCount = computed(() =>
  selectedEntries.value.reduce((sum, [, qty]) => sum + qty, 0),
)

const subtotal = computed(() =>
  selectedEntries.value.reduce((sum, [id, qty]) => {
    const price = getProductById(id)?.price ?? 0
    return sum + price * qty
  }, 0),
)

const tax = computed(() => Math.round(subtotal.value * TAX_RATE))
const serviceCharge = computed(() => Math.round(subtotal.value * SERVICE_RATE))
const total = computed(() => subtotal.value + tax.value + serviceCharge.value)

const hasItems = computed(() => selectedEntries.value.length > 0)

// Receipt metadata
const orderId = computed(() =>
  String(Math.floor(Date.now() / 1000) % 100000).padStart(5, '0'),
)
const currentTime = computed(() => {
  const d = new Date()
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  return `${hh}:${mm}`
})

// Swipe state (per-item)
const swipeOffset = reactive<Record<string, number>>({})
const isDeleting = reactive<Record<string, boolean>>({})
const activeSwipeId = ref<string | null>(null)
let swipeStartX = 0
let swipeCurrentX = 0
const SWIPE_THRESHOLD = 20

function onPointerDown(e: PointerEvent, id: string) {
  if (isDeleting[id])
    return
  activeSwipeId.value = id
  swipeStartX = e.clientX
  swipeCurrentX = e.clientX
  swipeOffset[id] = 0
  ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!activeSwipeId.value)
    return
  swipeCurrentX = e.clientX
  const dx = swipeCurrentX - swipeStartX
  // Clamp to rightward only, max 150px
  swipeOffset[activeSwipeId.value] = Math.max(0, Math.min(150, dx))
}

function onPointerUp() {
  const id = activeSwipeId.value
  if (!id)
    return

  const offset = swipeOffset[id] ?? 0
  activeSwipeId.value = null

  if (offset >= SWIPE_THRESHOLD) {
    // Phase 1: fly-out animation (slide right with a spring-like feel)
    isDeleting[id] = true
    swipeOffset[id] = 400
    // Phase 2: after fly-out completes, actually remove
    setTimeout(() => {
      emit('deleteItem', id)
      // Cleanup after AnimatePresence exit
      requestAnimationFrame(() => {
        delete isDeleting[id]
        delete swipeOffset[id]
      })
    }, 350)
  }
  else {
    // Snap back with Emil's ease-out
    swipeOffset[id] = 0
  }
}

const user = {
  name: 'Benjamin Canac',
  avatar: {
    src: 'https://github.com/benjamincanac.png',
    alt: 'Benjamin Canac',
  },
}

const userItems = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: 'Profile',
      icon: 'i-lucide-user',
    },
    {
      label: 'Billing',
      icon: 'i-lucide-credit-card',
    },
    {
      label: 'Settings',
      icon: 'i-lucide-settings',
      to: '/settings',
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
    {
      label: 'Log out',
      icon: 'i-lucide-log-out',
    },
  ],
])
</script>

<template>
  <USidebar
    v-model:open="sidebarOpen"
    side="right"
    :style="{ '--sidebar-width': '25rem' }"
    :ui="{
      container: 'h-full',
      body: 'py-3 overflow-x-hidden',
      header: 'px-8 py-7',
    }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <div>
          <h2 class="text-lg font-semibold">
            Table 2
          </h2>
          <p class="text-sm text-dimmed">
            Adit Gege
          </p>
        </div>
        <div>
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            icon="i-lucide-pencil-line"
            :ui="{ base: 'rounded-full p-3 text-dimmed' }"
          />
        </div>
      </div>
    </template>

    <template #default>
      <div class="flex flex-col gap-2">
        <AnimatePresence mode="popLayout">
          <motion.div
            v-for="([id, qty], index) in selectedEntries"
            :key="id"
            layout
            :initial="{ opacity: 0, x: 60, scale: 0.95 }"
            :animate="{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: { type: 'spring', stiffness: 500, damping: 40, mass: 0.8, delay: index * 0.04 },
            }"
            :exit="{
              opacity: 0,
              x: 120,
              scale: 0.85,
              transition: { type: 'spring', stiffness: 400, damping: 28, mass: 0.8 },
            }"
            :transition="{ type: 'spring', stiffness: 500, damping: 40, mass: 0.8 }"
            class="relative rounded-lg overflow-hidden"
          >
            <!-- Delete background: revealed when foreground swipes right -->
            <div
              class="absolute inset-0 rounded-lg flex items-center pl-4 z-0 transition-colors duration-150 ease-linear"
              :class="(swipeOffset[id] ?? 0) >= 20 ? 'bg-red-500' : 'bg-red-500/0'"
            >
              <UIcon
                name="i-lucide-trash-2"
                class="size-5 text-white transition-all duration-150 ease-linear"
                :class="(swipeOffset[id] ?? 0) >= 40 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'"
              />
            </div>

            <!-- Foreground: swipeable content -->
            <div
              class="relative z-10 bg-elevated rounded-lg p-3 flex items-center gap-3 cursor-grab active:cursor-grabbing select-none"
              :class="{ 'scale-[0.97]': (swipeOffset[id] ?? 0) >= 40 }"
              :style="{
                transform: `translateX(${swipeOffset[id] ?? 0}px)`,
                transition: activeSwipeId === id
                  ? 'none'
                  : isDeleting[id]
                    ? 'transform 280ms cubic-bezier(0.34, 1.3, 0.64, 1)'
                    : 'transform 250ms cubic-bezier(0.23, 1, 0.32, 1)',
              }"
              @pointerdown="onPointerDown($event, id)"
              @pointermove="onPointerMove($event)"
              @pointerup="onPointerUp"
              @pointerleave="onPointerUp"
            >
              <div class="size-8 shrink-0 bg-neutral-200 text-dimmed rounded-full flex items-center justify-center text-sm font-bold overflow-hidden">
                <span>{{ index + 1 }}</span>
              </div>
              <div class="flex-1 min-w-0 flex items-center gap-2">
                <span class="font-medium truncate text-default">
                  {{ getProductById(id)?.name }}
                </span>
                <span class="text-sm text-dimmed shrink-0">×{{ qty }}</span>
              </div>
              <div class="flex items-center gap-2 shrink-0">
                <UIcon
                  v-if="activeSwipeId === id || isDeleting[id]"
                  name="i-lucide-trash-2"
                  class="size-4 text-red-500 transition-all duration-200 ease-[var(--ease-out)]"
                />
                <span class="text-sm font-medium text-default">
                  {{ formatPrice(getProductById(id)?.price ?? 0) }}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div
          v-if="!selectedEntries.length"
          class="text-center text-dimmed italic py-8"
        >
          No items selected
        </div>
      </div>
    </template>

    <template #footer>
      <AnimatePresence>
        <motion.div
          v-if="hasItems"
          key="summary"
          layout
          :initial="{ opacity: 0, y: 24 }"
          :animate="{
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 380, damping: 32, mass: 0.9 },
          }"
          :exit="{
            opacity: 0,
            y: 16,
            transition: { duration: 0.2, ease: [0.32, 0, 0.67, 0] },
          }"
          class="receipt w-full"
        >
          <!-- Top zigzag edge -->
          <div class="receipt-zigzag receipt-zigzag--top" aria-hidden="true" />

          <!-- Receipt body -->
          <div class="receipt-body">
            <!-- Receipt header -->
            <div class="flex flex-col items-center gap-0.5 pb-3">
              <p class="receipt-mono text-[11px] uppercase tracking-[0.2em] text-default">
                Sorapos
              </p>
              <p class="receipt-mono text-[10px] text-dimmed">
                Order #{{ orderId }} · {{ currentTime }}
              </p>
            </div>

            <!-- Dashed divider -->
            <div class="receipt-divider" aria-hidden="true" />

            <!-- Summary breakdown with dotted leader -->
            <div class="flex flex-col gap-1.5 py-3 receipt-mono text-[12px]">
              <div class="receipt-row text-dimmed">
                <span class="receipt-row__label">
                  Subtotal ({{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }})
                </span>
                <span class="receipt-row__dots" aria-hidden="true" />
                <span class="receipt-row__value tabular-nums text-default">
                  {{ formatPrice(subtotal) }}
                </span>
              </div>
              <div class="receipt-row text-dimmed">
                <span class="receipt-row__label">Tax (11%)</span>
                <span class="receipt-row__dots" aria-hidden="true" />
                <span class="receipt-row__value tabular-nums">{{ formatPrice(tax) }}</span>
              </div>
              <div class="receipt-row text-dimmed">
                <span class="receipt-row__label">Service (5%)</span>
                <span class="receipt-row__dots" aria-hidden="true" />
                <span class="receipt-row__value tabular-nums">{{ formatPrice(serviceCharge) }}</span>
              </div>
            </div>

            <!-- Dashed divider -->
            <div class="receipt-divider" aria-hidden="true" />

            <!-- Total row -->
            <div class="flex items-baseline justify-between py-3">
              <span class="receipt-mono text-[12px] uppercase tracking-[0.18em] text-default">
                Total
              </span>
              <motion.span
                :key="total"
                :initial="{ opacity: 0, y: 8 }"
                :animate="{
                  opacity: 1,
                  y: 0,
                  transition: { type: 'spring', stiffness: 500, damping: 30 },
                }"
                class="receipt-mono text-xl font-bold tabular-nums text-default"
              >
                {{ formatPrice(total) }}
              </motion.span>
            </div>

            <!-- Thank-you note -->
            <div class="receipt-divider" aria-hidden="true" />
            <p class="receipt-mono text-center text-[10px] uppercase tracking-[0.25em] text-dimmed py-3">
              ~ Thank you ~
            </p>
          </div>

          <!-- Bottom zigzag edge -->
          <div class="receipt-zigzag receipt-zigzag--bottom" aria-hidden="true" />

          <!-- Place order CTA (outside the paper, below) -->
          <UButton
            block
            size="xl"
            color="neutral"
            class="rounded-full font-semibold mt-4"
            trailing-icon="i-lucide-arrow-right"
          >
            Place Order
          </UButton>
        </motion.div>
      </AnimatePresence>
    </template>

  </USidebar>
</template>

<style scoped>
/* Paper-like receipt container */
.receipt {
  --receipt-bg: var(--ui-bg, #fff);
  --receipt-zigzag-size: 8px;
  display: flex;
  flex-direction: column;
}

.receipt-body {
  background: var(--receipt-bg);
  padding: 16px 20px;
  box-shadow:
    0 1px 0 rgba(0, 0, 0, 0.02),
    0 4px 14px -6px rgba(0, 0, 0, 0.08);
}

/* Zigzag top/bottom edges (torn paper) */
.receipt-zigzag {
  height: var(--receipt-zigzag-size);
  background:
    linear-gradient(135deg, var(--receipt-bg) 25%, transparent 25%) 0 0 / var(--receipt-zigzag-size) var(--receipt-zigzag-size),
    linear-gradient(225deg, var(--receipt-bg) 25%, transparent 25%) 0 0 / var(--receipt-zigzag-size) var(--receipt-zigzag-size);
  background-repeat: repeat-x;
  filter: drop-shadow(0 -1px 0 rgba(0, 0, 0, 0.04));
}

.receipt-zigzag--top {
  transform: rotate(180deg);
}

.receipt-zigzag--bottom {
  filter: drop-shadow(0 1px 0 rgba(0, 0, 0, 0.04));
}

/* Monospace typewriter look */
.receipt-mono {
  font-family: ui-monospace, "SF Mono", "Cascadia Mono", "Roboto Mono", Menlo, Monaco, Consolas, monospace;
  font-feature-settings: "tnum" 1;
}

/* Dashed divider */
.receipt-divider {
  height: 1px;
  background-image: linear-gradient(
    to right,
    var(--ui-border, rgba(0, 0, 0, 0.18)) 50%,
    transparent 50%
  );
  background-size: 6px 1px;
  background-repeat: repeat-x;
  opacity: 0.6;
}

/* Dotted leader between label and value */
.receipt-row {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.receipt-row__label {
  flex-shrink: 0;
}

.receipt-row__dots {
  flex: 1;
  border-bottom: 1px dotted var(--ui-border, rgba(0, 0, 0, 0.25));
  transform: translateY(-3px);
  opacity: 0.55;
}

.receipt-row__value {
  flex-shrink: 0;
}
</style>
