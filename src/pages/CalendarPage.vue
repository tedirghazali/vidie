<template>
  <div class="flex container mgY-5">
    <div class="wd-25 pd-4">
      <div class="box dark">
        <CalendarBase />
      </div>
    </div>
    <div class="wd-75 pd-4">
      <div class="box dark">
        <CalendarEvent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CalendarEvent from '../components/calendar/CalendarEvent.vue'
import CalendarBase from '../components/calendar/CalendarBase.vue'

export default defineComponent({
  name: 'CalendarPage',
  components: {
    CalendarEvent,
    CalendarBase
  }
})
</script>
