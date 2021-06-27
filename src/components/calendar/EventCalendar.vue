<template>
  <div>
    <div v-if="toggleRef === 'yearly'">
      <YearlyCalendar :year="yearRef" />
    </div>
    <div v-if="toggleRef === 'monthly'">
      <MonthlyCalendar :year="yearRef" :month="monthRef" :weekday="'long'" />
    </div>
    <div v-if="toggleRef === 'weekly'">
      <WeeklyCalendar :year="yearRef" :month="monthRef" :day="dayRef" />
    </div>
    <div v-if="toggleRef === 'daily'">
      <DailyCalendar :year="yearRef" :month="monthRef" :day="dayRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import YearlyCalendar from './YearlyCalendar.vue'
import MonthlyCalendar from './MonthlyCalendar.vue'
import WeeklyCalendar from './WeeklyCalendar.vue'
import DailyCalendar from './DailyCalendar.vue'

export default defineComponent({
  name: 'CalendarPage',
  props: {
    toggle: {
      type: String,
      default: (typeof window === 'object' && 'localStorage' in window && localStorage.getItem('toggledCalendar')) ? localStorage.getItem('toggledCalendar') : 'monthly'
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    month: {
      type: Number,
      default: Number(new Date().getMonth()) + 1
    },
    day: {
      type: Number,
      default: new Date().getDate()
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
    const {toggle: toggleRef, year: yearRef, month: monthRef, day: dayRef} = toRefs(props)
    
    return {
      toggleRef,
      yearRef,
      monthRef,
      dayRef
    }
  }
})
</script>
