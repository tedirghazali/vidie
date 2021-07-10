<template>
  <div class="flex bdOpacity-2">
    <div :class="['txtCenter', 'bdStart-1', 'bdRight-0', 'bdBottom-1', 'bdSolid', 'bdBlack', 'bdDarker']" style="width: 60px;">
      <div class="pd-2">&nbsp;</div>
      <div v-for="n in allDay" :key="n">
        <div class="bdTop-1 bdDarker pd-2">
          <span v-if="n === 1">allday</span>
          <span v-else>&nbsp;</span>
        </div>
        <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2">&nbsp;</div>
      </div>
      <div v-for="n in 24" :key="n - 1">
        <div class="bdTop-1 bdDarker pd-2">{{ n - 1 }}:00</div>
        <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2">&nbsp;</div>
      </div>
    </div>
    <div class="gridColumns-7 bdStart-1 bdEnd-0 bdSolid bdBlack flexFill">
      <div v-for="(wday, index) in getDayNames" :key="wday" :class="['wd-100', 'txtCenter', 'bdStart-0', 'bdEnd-1', 'bdSolid', 'bdBlack', 'eventNone', 'selectionNone']" :ref="setDateRef">
        <div class="pd-2">{{ wday }} {{ showDay(getWeekDays[index]) }}</div>
        <div v-for="n in allDay" :key="n">
          <div class="relative bdTop-1 bdDarker pd-2 txtLeft">
            <div v-if="allDayEvents[Number(n) - 1] !== undefined && matchDay(allDayEvents[Number(n) - 1].startdate) === index" class="absolute rd-2 pdY-1 pdX-2 txtLeft txt-2 txtTruncate primary" :style="{ width: (allDayEvents[Number(n) - 1].enddate !== '0000-00-00 00:00:00' && allDayEvents[Number(n) - 1].enddate !== allDayEvents[Number(n) - 1].startdate) ? eventWidth(allDayEvents[Number(n) - 1].startdate, allDayEvents[Number(n) - 1].enddate) : widthRefs['frameWidth'] +'px', left: '2.5px', top: '2.5px' }">{{ allDayEvents[Number(n) - 1].title }}</div>
            <div>&nbsp;</div>
          </div>
          <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2 txtLeft">&nbsp;</div>
        </div>
        <div v-for="n in 24" :key="n - 1">
          <div class="bdTop-1 bdDarker pd-2 txtLeft">&nbsp;</div>
          <div class="bdTop-1 bdX-0 bdBottom-0 bdDashed bdDarker pd-2 txtLeft">&nbsp;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, toRefs, inject } from 'vue'
import { useCalendar } from '../../assets/alga-vue.es.js'

export default defineComponent({
  name: 'WeeklyCalendar',
  props: {
    start: {
      type: String
    },
    end: {
      type: String
    },
    events: {
      type: Array,
      default: []
    },
    dayType: {
      type: String,
      default: 'short'
    }
  },
  emits: ['update:start', 'update:end'],
  setup(props, context) {
    const allDay = ref<number>(0)
    const allDayEvents = ref<any[]>([])
    const dateRef: any[] = []
    const widthRefs = reactive<any>({
      frameWidth: ref<number>(0)
    })
    
    const { events, dayType } = toRefs(props)
    
    const year = inject<number>('year', new Date().getFullYear())
    const month = inject<number>('month', Number(new Date().getMonth()) + 1)
    const day = inject<number>('day', new Date().getDate())
    const locale = inject<number>('locale', 'en-US')
    
    const { getDayNames, setWeeks, getWeeks, getWeekDays } = useCalendar(year, month, day, locale, dayType)
    
    const week = inject<number>('week', getWeeks.value)
    
    watch(week, (newVal, oldVal) => {
      setWeeks.value = week.value
      context.emit('update:start', getWeekDays.value[0])
      context.emit('update:end', getWeekDays.value[6])
    })
    
    const showDay = (dateStr: string) => {
      const dateArr: string[] = dateStr.split('-')
      return new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2])).getDate()
    }
    
    const matchDay = (dateStr: string) => {
      const dateArr: string[] = dateStr.replace('Z', '').split(/-|:|\s|\.|T/g)
      return new Date(Number(dateArr[0]), Number(dateArr[1]) - 1, Number(dateArr[2])).getDay()
    }
    
    const setDateRef = (el: any) => {
      if(el) {
        dateRef.push(el)
        if(widthRefs['frameWidth'] === 0) {
          widthRefs['frameWidth'] = el.clientWidth
        }
      }
    }
    
    const eventWidth = (startStr: string, endStr: string) => {
      const frame = widthRefs['frameWidth']
      const startDate = Number(new Date(startStr).getDay()) * frame
      const endDate = (Number(new Date(endStr).getDay()) + 1) * frame
      const subtractFrame = endDate - startDate
      return subtractFrame !== 0 ? subtractFrame + 'px' : frame + 'px'
    }
    
    allDayEvents.value = events.value.filter(n => n.allday === 1)
    allDay.value = allDayEvents.value.length !== 0 ? allDayEvents.value.length : 1
    
    return {
      getDayNames,
      getWeekDays,
      showDay,
      matchDay,
      allDay,
      allDayEvents,
      setDateRef,
      widthRefs,
      eventWidth
    }
  }
})
</script>
