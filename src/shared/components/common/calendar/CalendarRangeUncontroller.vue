<script setup lang="ts">
import type { DateRange, DateValue } from 'reka-ui'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { getLocalTimeZone, today } from '@internationalized/date'
import { ChevronDownIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { computed, ref, watch, type Ref } from 'vue'

interface Props {
  placeholder?: string
  align?: 'start' | 'center' | 'end'
  numberOfMonths?: number
  quickRanges?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select date range',
  align: 'end',
  numberOfMonths: 1,
  quickRanges: true,
})
const emit = defineEmits<{
  'update:modelValue': [value: DateRange | null]
}>()

const start = today(getLocalTimeZone())
const end = start

const range = ref<DateRange>({ start, end }) as Ref<DateRange | null>

const lastValidEnd = ref<DateValue>(end)

const formattedDate = computed(() => {
  if (!range.value) return props.placeholder

  const startDate = range.value.start?.toDate(getLocalTimeZone())
  const endDate = (range.value.end ?? lastValidEnd.value).toDate(getLocalTimeZone())

  return `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`
})

const quickRangesOptions = [
  {
    label: 'Hoy',
    getRange: () => {
      const todayDate = today(getLocalTimeZone())
      return { start: todayDate, end: todayDate }
    },
  },
  {
    label: 'Últimos 7 días',
    getRange: () => {
      const todayDate = today(getLocalTimeZone())
      const pastDate = todayDate.subtract({ days: 6 })
      return { start: pastDate, end: todayDate }
    },
  },
  {
    label: 'Últimos 30 días',
    getRange: () => {
      const todayDate = today(getLocalTimeZone())
      const pastDate = todayDate.subtract({ days: 29 })
      return { start: pastDate, end: todayDate }
    },
  },
  {
    label: 'Mes actual',
    getRange: () => {
      const todayDate = today(getLocalTimeZone())
      const startOfMonth = todayDate.set({ day: 1 })
      return { start: startOfMonth, end: todayDate }
    },
  },
  {
    label: 'Mes pasado',
    getRange: () => {
      const todayDate = today(getLocalTimeZone())
      const startOfLastMonth = todayDate.subtract({ months: 1 }).set({ day: 1 })
      const endOfLastMonth = startOfLastMonth.add({ months: 1 }).subtract({ days: 1 })
      return { start: startOfLastMonth, end: endOfLastMonth }
    },
  },
  {
    label: 'Año actual',
    getRange: () => {
      const todayDate = today(getLocalTimeZone())
      const startOfYear = todayDate.set({ month: 1, day: 1 })
      return { start: startOfYear, end: todayDate }
    },
  },
  {
    label: 'Año pasado',
    getRange: () => {
      const todayDate = today(getLocalTimeZone())
      const startOfLastYear = todayDate.subtract({ years: 1 }).set({ month: 1, day: 1 })
      const endOfLastYear = startOfLastYear.add({ years: 1 }).subtract({ days: 1 })
      return { start: startOfLastYear, end: endOfLastYear }
    },
  },
]

const isSameDate = (a: DateValue | undefined, b: DateValue | undefined): boolean => {
  if (!a || !b) return false
  return a.compare(b) === 0
}

const activeQuickRange = computed(() => {
  if (!range.value?.start || !range.value?.end) return null

  for (const option of quickRangesOptions) {
    const optionRange = option.getRange()
    if (
      isSameDate(range.value.start, optionRange.start) &&
      isSameDate(range.value.end, optionRange.end)
    ) {
      return option.label
    }
  }
  return null
})

const setRange = (start: DateValue, end: DateValue, close: () => void) => {
  range.value = { start, end }
  emit('update:modelValue', range.value)
  close()
}

watch(
  () => range.value?.end,
  (newEnd) => {
    if (newEnd) {
      lastValidEnd.value = newEnd
    }
  },
)
</script>
<template>
  <Popover v-slot="{ close }">
    <PopoverTrigger as-child>
      <Button id="date" variant="outline" class="justify-between font-normal">
        {{ formattedDate }}
        <ChevronDownIcon />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-max overflow-hidden p-0" align="end">
      <div class="flex flex-col md:flex-row md:gap-2 divide-y md:divide-x divide-border">
        <RangeCalendar
          v-model="range"
          class="md:order-2"
          :number-of-months="numberOfMonths"
          @update:model-value="
            (value: DateRange) => {
              if (value && value.start && value.end) {
                emit('update:modelValue', value)
                close()
              }
            }
          "
          locale="es-ES"
        />
        <div v-if="quickRanges" class="md:w-48 flex flex-col p-1 md:p-4 md:order-1">
          <Button
            v-for="quickRange in quickRangesOptions"
            :key="quickRange.label"
            :variant="activeQuickRange === quickRange.label ? 'secondary' : 'ghost'"
            class="justify-start w-full"
            @click="setRange(quickRange.getRange().start, quickRange.getRange().end, close)"
          >
            {{ quickRange.label }}</Button
          >
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>
