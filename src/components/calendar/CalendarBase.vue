<template>
  <div class="gridColumns-7 gridItemsCenter">
    <div v-for="cal in calendar" :key="cal" :class="['mgY-1', 'wd-100', 'txtCenter', {'txtGray': blurDate(cal), 'eventNone': disabledClickDate(cal), 'cursorPointer': disabledClickDate(cal) === false}]" @click="eventDate(cal), $emit('leave')">
      <div :class="['pd-2', {'green': resultDate === cal}]">{{ filterDate(cal) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, watch } from 'vue'
import { $date as useDate } from 'alga-js'

export default defineComponent({
  name: 'Calendar',
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
    const year = ref<number>(0)
    const month = ref<number>(0)
    const resultDate = ref<string>('')

    const calendar = ref<string[]>([])
    const getDayNames = ref<string[]>([])

    year.value = props.year
    month.value = props.month

    calendar.value = useDate.calendar(year.value, month.value)
    getDayNames.value = calendar.value.slice(0, 7)

    const filterDate = (date: string) => {
      let newDate = ''
      if(getDayNames.value.includes(date)) {
        newDate = date.slice(0, 3)
      } else {
        const splitDate = date.split('-')
        newDate = splitDate[2]
      }
      return newDate
    }

    const blurDate = (date: string) => {
      let blurText = false
      if(!getDayNames.value.includes(date) && Number(date.split('-')[1]) !== month.value) {
        blurText = true
      }
      return blurText
    }

    const disabledClickDate = (date: string) => {
      let disabledClick = false
      if(getDayNames.value.includes(date) || Number(date.split('-')[1]) !== month.value) {
        disabledClick = true
      }
      return disabledClick
    }

    const eventDate = (date: string) => {
      resultDate.value = date
      context.emit('update:modelValue', resultDate.value)
    }

    const { current, ...rest } = toRefs(props)
    watch(current, (newVal, oldVal) => {
      resultDate.value = props.current
    })

    watch(rest.month, (newVal, oldVal) => {
      month.value = props.month
      calendar.value = useDate.calendar(year.value, month.value)
    })

    watch(rest.year, (newVal, oldVal) => {
      year.value = props.year
      calendar.value = useDate.calendar(year.value, month.value)
    })

    return {
      calendar,
      filterDate,
      blurDate,
      disabledClickDate,
      eventDate,
      resultDate
    }
  }
})
</script>
