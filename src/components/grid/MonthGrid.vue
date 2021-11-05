<script lang="ts" setup>
import { computed } from 'vue'
import { date as dt } from 'alga-js'

interface Props {
  date?: string
}

const props = withDefaults(defineProps<Props>(), {
  date: new Date().toJSON().slice(0, 10)
})

const splitDate = (dateArg: string) => {
  return dateArg.split('-')
}

const prevDaysInMonth = computed<any[]>(() => {
  const newDate = splitDate(props.date)
  return dt.prevDaysInCalendar(newDate[0], newDate[1])
})

const daysInMonth = computed<number>(() => {
  const newDate = splitDate(props.date)
  return dt.daysInMonth(newDate[0], newDate[1])
})

const nextDaysInMonth = computed<any[]>(() => {
  const newDate = splitDate(props.date)
  return dt.nextDaysInCalendar(newDate[0], newDate[1])
})
</script>

<template>
  <div class="monthGrid" style="height: 800px;">
    <div v-for="prevNum in prevDaysInMonth" :key="prevNum" class="monthItem">
      <div class="monthHeader">{{ prevNum }}</div>
      <div class="monthBody"></div>
      <div class="monthFooter"></div>
    </div>
    <div v-for="dayNum in daysInMonth" :key="dayNum" class="monthItem">
      <div class="monthHeader">{{ dayNum }}</div>
      <div class="monthBody"></div>
      <div class="monthFooter"></div>
    </div>
    <div v-for="nextNum in nextDaysInMonth" :key="nextNum" class="monthItem">
      <div class="monthHeader">{{ nextNum }}</div>
      <div class="monthBody"></div>
      <div class="monthFooter"></div>
    </div>
  </div>
</template>

<style scoped>
.monthGrid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(16.666666667%, 1fr);
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
}

.monthItem {
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.monthHeader {
  text-align: right;
}

.monthBody {
  flex-grow: 1;
}
</style>
