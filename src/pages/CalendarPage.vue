<template>
  <div class="container mgY-5">
    <div class="box dark">
      <EventCalendarBar v-model:toggle="toggleRef" v-model:year="yearRef" v-model:month="monthRef" v-model:day="dayRef" v-model:week="weekRef" @action="" class="mgY-3" style="--bdColor: rgb(204, 204, 204);" />
      <EventCalendar v-model:toggle="toggleRef" v-model:yearly="yearlyRef" v-model:start="startDateRef" v-model:end="endDateRef" v-bind:yearlyEvents="getEventsByYear" v-bind:monthlyEvents="getEventsByMonth" v-bind:dailyEvents="getEventsByDate" v-bind:weeklyEvents="getEventsInBetween" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch } from 'vue'
import { useCalendar } from '../assets/alga-vue.es.js'
import useEvents from '../composables/useEvents'
import EventCalendar from '../components/calendar/EventCalendar.vue'
import EventCalendarBar from '../components/calendar/EventCalendarBar.vue'

export default defineComponent({
  name: 'CalendarPage',
  components: {
    EventCalendar,
    EventCalendarBar
  },
  setup() {
    const toggleRef = ref<string>('')
    const yearlyRef = ref<string>('')
    
    const yearRef = ref<number>(0)
    const monthRef = ref<number>(0)
    const dayRef = ref<number>(0)
    const weekRef = ref<number>(0)
    const events = ref<any[]>([])
    
    yearRef.value = new Date().getFullYear()
    monthRef.value = Number(new Date().getMonth()) + 1
    dayRef.value = new Date().getDate()
    
    toggleRef.value = 'monthly'
    
    const { setWeeks, getWeeks, getWeekDays } = useCalendar(yearRef, monthRef, dayRef)
    const { startDateRef, endDateRef, getEventsByYear, getEventsByMonth, getEventsByDate, getEventsInBetween } = useEvents(yearRef, monthRef, dayRef, toggleRef)
    
    weekRef.value = getWeeks.value
    startDateRef.value = getWeekDays.value[0]
    endDateRef.value = getWeekDays.value[6]
    
    watch(weekRef, () => {
      setWeeks.value = weekRef.value
      startDateRef.value = getWeekDays.value[0]
      endDateRef.value = getWeekDays.value[6]
    })
    
    watch(yearlyRef, () => {
      const yearlyArray: string[] = yearlyRef.value.replace('Z', '').split(/-|:|\s|\.|T/g)
      yearRef.value = Number(yearlyArray[0])
      monthRef.value = Number(yearlyArray[1])
      dayRef.value = Number(yearlyArray[2])
      toggleRef.value = 'daily'
    })
    
    provide('year', yearRef)
    provide('month', monthRef)
    provide('day', dayRef)
    provide('week', weekRef)
    
    return {
      toggleRef,
      yearlyRef,
      yearRef,
      monthRef,
      dayRef,
      weekRef,
      startDateRef,
      endDateRef,
      getEventsByYear,
      getEventsByMonth,
      getEventsByDate,
      getEventsInBetween
    }
  }
})
</script>
