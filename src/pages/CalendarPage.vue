<template>
  <div class="container mgY-5">
    <div class="box dark">
      <EventCalendarBar v-model:toggle="toggleRef" v-model:year="yearRef" v-model:month="monthRef" v-model:day="dayRef" @action="" class="mgY-3" style="--bdColor: rgb(204, 204, 204);" />
      <EventCalendar v-model:toggle="toggleRef" :year="yearRef" :month="monthRef" :day="dayRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
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
    const yearRef = ref<number>(0)
    const monthRef = ref<number>(0)
    const dayRef = ref<number>(0)
    
    yearRef.value = new Date().getFullYear()
    monthRef.value = Number(new Date().getMonth()) + 1
    dayRef.value = new Date().getDate()
    
    provide('year', yearRef)
    provide('month', monthRef)
    provide('day', dayRef)
    
    toggleRef.value = 'monthly'
    
    return {
      toggleRef,
      yearRef,
      monthRef,
      dayRef
    }
  }
})
</script>
