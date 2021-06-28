<template>
  <div>
    <div v-if="toggleRef === 'yearly'">
      <YearlyCalendar :locale="'en-US'" :weekday="'narrow'" />
    </div>
    <div v-if="toggleRef === 'monthly'">
      <MonthlyCalendar :locale="'en-US'" :weekday="'long'" />
    </div>
    <div v-if="toggleRef === 'weekly'">
      <WeeklyCalendar :locale="'en-US'" :weekday="'short'" />
    </div>
    <div v-if="toggleRef === 'daily'">
      <DailyCalendar :locale="'en-US'" :weekday="'short'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, inject } from 'vue'
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
    }
  },
  emits: ['update:toggle'],
  components: {
    YearlyCalendar,
    MonthlyCalendar,
    WeeklyCalendar,
    DailyCalendar
  },
  setup(props, context) {
    const toggleRef = toRef(props, 'toggle')
    
    return {
      toggleRef
    }
  }
})
</script>
