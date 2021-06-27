<template>
  <div class="container mgY-5">
    <div class="box dark">
      <EventCalendarBar v-model:toggle="toggleRef" @action="" class="mgY-3" style="--bdColor: rgb(204, 204, 204);" />
      <EventCalendar v-model:toggle="toggleRef" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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
    
    toggleRef.value = 'monthly'
    
    return {
      toggleRef
    }
  }
})
</script>
