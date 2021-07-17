<template>
  <div>
    <div v-if="toggleRef === 'yearly'">
      <YearlyCalendar v-model="yearRef" :events="yearlyEvents" :dayType="'narrow'" :monthType="'long'" />
    </div>
    <div v-if="toggleRef === 'monthly'">
      <MonthlyCalendar :events="monthlyEvents" :dayType="'long'" />
    </div>
    <div v-if="toggleRef === 'weekly'">
      <WeeklyCalendar v-model:start="startRef" v-model:end="endRef" :events="weeklyEvents" :dayType="'short'" />
    </div>
    <div v-if="toggleRef === 'daily'">
      <DailyCalendar :events="dailyEvents" :dayType="'short'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, watch } from 'vue'
import YearlyCalendar from './YearlyCalendar.vue'
import MonthlyCalendar from './MonthlyCalendar.vue'
import WeeklyCalendar from './WeeklyCalendar.vue'
import DailyCalendar from './DailyCalendar.vue'

export default defineComponent({
  name: 'CalendarPage',
  props: {
    toggle: {
      type: String,
      default: 'monthly'
    },
    yearly: {
      type: String
    },
    start: {
      type: String,
    },
    end: {
      type: String,
    },
    yearlyEvents: {
      type: Array,
      default: []
    },
    monthlyEvents: {
      type: Array,
      default: []
    },
    dailyEvents: {
      type: Array,
      default: []
    },
    weeklyEvents: {
      type: Array,
      default: []
    },
  },
  emits: ['update:yearly', 'update:start', 'update:end'],
  components: {
    YearlyCalendar,
    MonthlyCalendar,
    WeeklyCalendar,
    DailyCalendar
  },
  setup(props, context) {
    const yearRef = ref<string>('')
    const startRef = ref<string>('')
    const endRef = ref<string>('')
    const toggleRef = toRef(props, 'toggle')
    const yearlyEvents = toRef(props, 'yearlyEvents')
    const monthlyEvents = toRef(props, 'monthlyEvents')
    const dailyEvents = toRef(props, 'dailyEvents')
    const weeklyEvents = toRef(props, 'weeklyEvents')
    
    watch(startRef, () => {
      context.emit('update:start', startRef.value)
    })
    
    watch(endRef, () => {
      context.emit('update:end', endRef.value)
    })
    
    watch(yearRef, () => {
      context.emit('update:yearly', yearRef.value)
    })
    
    return {
      yearRef,
      startRef,
      endRef,
      toggleRef,
      yearlyEvents,
      monthlyEvents,
      dailyEvents,
      weeklyEvents
    }
  }
})
</script>
