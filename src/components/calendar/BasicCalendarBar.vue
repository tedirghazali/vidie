<template>
  <div class="flexBetween itemsCenter pd-2">
    <div class="cursorPointer dark">Prev</div>
    <div class="flexEvenly">
      <SelectPicker v-model="setMonthRef" :options="getMonthNames" class="mgRight-2" />
      <SelectPicker v-model="setYearRef" :options="getRangeYears" />
    </div>
    <div class="cursorPointer dark">Next</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { handleCalendar } from 'alga-vue' //../../assets/alga-vue.es.js
import SelectPicker from '../picker/SelectPicker.vue'

export default defineComponent({
  name: 'BasicCalendarBar',
  props: {
    modelValue: {
      type: String,
      default: ''
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
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    weekday: {
      type: String,
      default: 'short'
    }
  },
  components: {
    SelectPicker
  },
  setup(props, context) {
    const {
      setYearRef,
      setMonthRef,
      setDayRef,
      setWeeks,
      setCalendarType,
      startYear,
      endYear,
      getRangeYears,
      getMonthNames,
      getDayNames,
      getWeeks,
      getCalendarTitle,
      handleYear,
      handleMonth,
      handleWeek,
      handleDay
    } = handleCalendar()
    
    setYearRef.value = Number(new Date().getFullYear())
    setMonthRef.value = Number(new Date().getMonth())
    
    return {
      setYearRef,
      setMonthRef,
      setDayRef,
      setWeeks,
      setCalendarType,
      startYear,
      endYear,
      getRangeYears,
      getMonthNames,
      getDayNames,
      getWeeks,
      getCalendarTitle,
      handleYear,
      handleMonth,
      handleWeek,
      handleDay
    }
  }
})
</script>
