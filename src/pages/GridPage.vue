<script lang="ts" setup>
import DayGrid from '../components/grid/DayGrid.vue'
import MonthGrid from '../components/grid/MonthGrid.vue'
import WeekGrid from '../components/grid/WeekGrid.vue'
</script>

<template>
  <div class="container" style="padding: 20px;">
    <div class="calendar">
      <div class="calendarDay">
        <DayGrid />
      </div>
      <div class="calendarMonth">
        <MonthGrid />
      </div>
      <div class="calendarWeek">
        <WeekGrid />
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: grid;
  grid-template-areas: "weekGrid dayGrid" "weekGrid monthGrid" "weekGrid monthGrid";
  grid-template-columns: auto 1fr;
}

.calendarDay {
  grid-area: dayGrid;
}

.calendarMonth {
  grid-area: monthGrid;
}

.calendarWeek {
  grid-area: weekGrid;
}
</style>
