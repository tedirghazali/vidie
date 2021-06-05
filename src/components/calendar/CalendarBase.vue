<template>
  <div class="gridColumns-7 gridItemsCenter">
    <div v-for="cal in calendar" :key="cal" :class="['mgY-1', 'wd-100', 'txtCenter', {'txtGray': isCurrentCalendar(cal) === false, 'eventNone': isCurrentDate(cal) === false, 'cursorPointer': isCurrentDate(cal)}]" @click="eventDate(cal), $emit('leave')">
      <div :class="['pd-2', {'green': resultDate === cal}]">{{ filterCalendarDate(cal, 2) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
import { useCalendar } from '../../assets/alga-vue.es.js'

export default defineComponent({
  name: 'CalendarBase',
  props: {
    modelValue: {
      type: String
    },
    current: {
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
    }
  },
  emits: ['update:modelValue', 'leave'],
  setup(props, context) {
    const resultDate = ref<string>('')
    const { 
      getCalendar, 
      getDayNames, 
      setCalendarYear, 
      setCalendarMonth, 
      filterCalendarDate, 
      isCurrentCalendar, 
      isCurrentDate
    } = useCalendar()
  
    setCalendarYear.value = props.year
    setCalendarMonth.value = props.month
  
    const eventDate = (date: string) => {
      resultDate.value = date
      context.emit('update:modelValue', resultDate.value)
    }

    const { current, ...rest } = toRefs(props)
    watch(current, (newVal, oldVal) => {
      resultDate.value = props.current
    })

    watch(rest.month, (newVal, oldVal) => {
      setCalendarMonth.value = props.month
    })

    watch(rest.year, (newVal, oldVal) => {
      setCalendarYear.value = props.year
    })

    return {
      calendar: getCalendar,
      filterCalendarDate,
      isCurrentCalendar,
      isCurrentDate,
      eventDate,
      resultDate
    }
  }
})
</script>
