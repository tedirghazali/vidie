<template>
  <div class="dark">
    <div class="gridColumns-7 gridItemsCenter bdStart-1 bdEnd-0 bdSolid bdOpacity-2 bdBlack">
      <div v-for="wday in getDayNames" :key="wday" :class="['wd-100', 'txtCenter', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']">
        <div class="pd-2">{{ wday }}</div>
      </div>
      <div v-for="pday in getPrevDays" :key="pday" :class="['wd-100', 'txtRight', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']">
        <div class="pd-2 txtGray" style="height: 170px">{{ pday }}</div>
      </div>
      <div v-for="mday in getMonthDays" :key="mday" :class="['wd-100', 'txtRight', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack']" @click="eventDate(mday)">
        <div class="pd-2 flex flexColumn" style="height: 180px">
          <div>{{ mday }}</div>
          <template v-if="`${mday}` in getEvents">
            <div class="relative flexFill mgTop-1" :ref="setDateRef">
              <template v-for="(event, index) in getEvents[`${mday}`]" :key="event">
                <template v-if="index <= 3">
                  <div v-if="event.allday === 0" class="absolute left-0 rd-2 pdY-1 pdX-2 txtLeft txt-2 txtTruncate bgBrightest dark" :style="{ width: widthRefs['frameWidth'] +'px', top: (Number(index) * 30) + 'px' }"><span class="dot mgRight-2"></span>{{ getShortTime(event.startdate) }} {{ event.title }}</div>
                  <div v-else class="absolute left-0 rd-2 pdY-1 pdX-2 txtLeft txt-2 txtTruncate primary" :style="{ width: (event.enddate !== '0000-00-00 00:00:00' && event.enddate !== event.startdate) ? eventWidth(event.startdate, event.enddate) : widthRefs['frameWidth'] +'px', top: (Number(index) * 30) + 'px' }">{{ event.title }}</div>
                </template>
              </template>
            </div>
            <div class="txtGray txt-1">{{ (Number(getEvents[`${mday}`].length) - 4 >= 1) ? '+'+ (Number(getEvents[`${mday}`].length) - 4) +' more': ''  }}</div>
          </template>
        </div>
      </div>
      <div v-for="nday in getNextDays" :key="nday" :class="['wd-100', 'txtRight', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']">
        <div class="pd-2 ph-20 txtGray" style="height: 170px">{{ nday }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, inject, watch } from 'vue'
import { useCalendar } from 'alga-vue' //../../assets/alga-vue.es.js

export default defineComponent({
  name: 'MonthlyCalendar',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    events: {
      type: Array,
      default: []
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    dayType: {
      type: String,
      default: 'short'
    }
  },
  emits: ['update:modelValue', 'action'],
  setup(props, context) {
    const resultDate = ref<string>('')
    const { modelValue: current, locale, dayType, events } = toRefs(props)
    const dateRefs: any[] = []
    const widthRefs = reactive<any>({
      frameWidth: ref<number>(0)
    })
    
    const year = inject<number>('year', new Date().getFullYear())
    const month = inject<number>('month', Number(new Date().getMonth()) + 1)
    
    const { setYearRef, setMonthRef, getDayNames, getPrevDays, getMonthDays, getNextDays, setEvents, getEvents } = useCalendar(year, month, null, locale, dayType)
    
    watch(events, () => {
      setEvents.value = events.value
    })
    
    watch(year, (newVal, oldVal) => {
      setYearRef.value = year.value
    })
    
    watch(month, (newVal, oldVal) => {
      setMonthRef.value = month.value
      setEvents.value = events.value
    })
    
    const setDateRef = (el: any) => {
      if(el) {
        dateRefs.push(el)
        if(widthRefs['frameWidth'] === 0) {
          widthRefs['frameWidth'] = el.clientWidth
        }
      }
    }
    
    const getShortTime = (dateStr: string) => {
      return new Date(dateStr).toTimeString().match(/\d{2}:\d{2}/g).toString()
    }
    
    const eventWidth = (startStr: string, endStr: string) => {
      const frame = Number(widthRefs['frameWidth']) + 16
      const startDate = Number(new Date(startStr).getDay()) * frame
      const endDate = (Number(new Date(endStr).getDay()) + 1) * frame
      return (endDate - (startDate + 8)) + 'px'
    }
    
    const eventDate = (date: string) => {
      resultDate.value = date
      context.emit('update:modelValue', resultDate.value)
    }

    watch(current, (newVal, oldVal) => {
      resultDate.value = props.current
    })

    return {
      getDayNames,
      getPrevDays,
      getMonthDays,
      getNextDays,
      setDateRef,
      widthRefs,
      getEvents,
      getShortTime,
      eventWidth,
      eventDate,
      resultDate
    }
  }
})
</script>
