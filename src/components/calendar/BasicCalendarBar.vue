<template>
  <div class="flexBetween itemsCenter pd-2">
    <div class="cursorPointer dark">Prev</div>
    <div class="flexEvenly">
      <SelectPicker v-model="setCurrentMonth" :options="getMonthNames" class="mgRight-2" />
      <SelectPicker v-model="setCurrentYear" :options="getRangeYears" />
    </div>
    <div class="cursorPointer dark">Next</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { handleCalendar } from '../../assets/alga-vue.es.js'
import SelectPicker from '../picker/SelectPicker.vue'

export default defineComponent({
  name: 'BasicCalendarBar',
  components: {
    SelectPicker
  },
  setup() {
    const {
      setCurrentYear,
      setCurrentMonth,
      startYear,
      endYear,
      getRangeYears,
      getMonthNames,
      invokeControlEvent
    } = handleCalendar()
    
    setCurrentYear.value = Number(new Date().getFullYear())
    setCurrentMonth.value = Number(new Date().getMonth())
    
    return {
      setCurrentYear,
      setCurrentMonth,
      getRangeYears,
      getMonthNames,
      invokeControlEvent
    }
  }
})
</script>
