<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'
import { defineShortcuts, extractShortcuts } from '@nuxt/ui/composables'
import { useColorMode } from '@vueuse/core'
import { computed, ref } from 'vue'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const sidebarOpen = computed({
  get: () => props.open,
  set: (val: boolean) => emit('update:open', val),
})

const colorMode = useColorMode()

const teams = [
  {
    label: 'Nuxt',
    avatar: {
      src: 'https://github.com/nuxt.png',
      alt: 'Nuxt',
    },
  },
  {
    label: 'Vue',
    avatar: {
      src: 'https://github.com/vuejs.png',
      alt: 'Vue',
    },
  },
  {
    label: 'UnJS',
    avatar: {
      src: 'https://github.com/unjs.png',
      alt: 'UnJS',
    },
  },
]

const selectedTeam = ref(teams[0])

const teamsItems = computed<DropdownMenuItem[][]>(() => {
  return [
    teams.map((team, index) => ({
      ...team,
      kbds: ['meta', String(index + 1)],
      onSelect() {
        selectedTeam.value = team
      },
    })),
    [
      {
        label: 'Create team',
        icon: 'i-lucide-circle-plus',
      },
    ],
  ]
})

function getItems(_state: 'collapsed' | 'expanded') {
  return [
    { label: 'Reservations' },
    { label: 'Table services' },
    { label: 'Menu' },
    { label: 'Delivery' },
    { label: 'Accounting' },
  ] satisfies NavigationMenuItem[]
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
      label: 'Appearance',
      icon: 'i-lucide-sun-moon',
      children: [
        {
          label: 'Light',
          icon: 'i-lucide-sun',
          type: 'checkbox',
          checked: colorMode.value === 'light',
          onUpdateChecked(checked: boolean) {
            if (checked)
              colorMode.value = 'light'
          },
          onSelect(e: Event) {
            e.preventDefault()
          },
        },
        {
          label: 'Dark',
          icon: 'i-lucide-moon',
          type: 'checkbox',
          checked: colorMode.value === 'dark',
          onUpdateChecked(checked: boolean) {
            if (checked)
              colorMode.value = 'dark'
          },
          onSelect(e: Event) {
            e.preventDefault()
          },
        },
      ],
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

defineShortcuts(extractShortcuts(teamsItems.value))
</script>

<template>
  <USidebar
    v-model:open="sidebarOpen"
    :ui="{
      container: 'h-full',
      body: 'py-3',
      header: 'px-8 py-10',
    }"
  >
    <template #header>
      <Logo />
    </template>

    <template #default="{ state }">
      <UNavigationMenu
        :key="state"
        :items="getItems(state)"
        orientation="vertical"
        :ui="{ link: 'overflow-hidden px-6 text-md py-3' }"
      />
    </template>

    <template #footer>
      <UDropdownMenu
        :items="userItems"
        :content="{ align: 'center', collisionPadding: 12 }"
        :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width) min-w-48' }"
      >
        <UButton
          v-bind="user"
          :label="user?.name"
          trailing-icon="i-lucide-chevrons-up-down"
          color="neutral"
          variant="ghost"
          square
          class="w-full data-[state=open]:bg-elevated overflow-hidden"
          :ui="{
            trailingIcon: 'text-dimmed ms-auto',
          }"
        />
      </UDropdownMenu>
    </template>
  </USidebar>
</template>
