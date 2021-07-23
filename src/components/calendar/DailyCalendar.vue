<template>
  <div class="list listBorder listSharp bdDarker">
    <template v-for="event in events" :key="event">
      <div v-if="event.allday === 1" class="listItem active flex txtBold bgDarkest bdDarker">
        <div class="pw-15">allday</div>
        <div class="pdLeft-2">
          <span class="dot"></span>
          <span class="pdLeft-3">{{ event.title }}</span>
        </div>
      </div>
      <div v-else class="listItem flex bdDarker">
        <div v-if="event.enddate === '0000-00-00 00:00:00'" class="pw-15">{{ getShortTime(event.startdate) }}</div>
        <div v-else class="pw-15">{{ getShortTime(event.startdate) }} - {{ getShortTime(event.enddate) }}</div>
        <div class="pdLeft-2">
          <span class="dot"></span>
          <span class="pdLeft-3">{{ event.title }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, inject } from 'vue'

export default defineComponent({
  name: 'DailyCalendar',
  props: {
    events: {
      type: Array,
      default: []
    },
    dayType: {
      type: String,
      default: 'short'
    }
  },
  setup(props) {
    const year = inject<number>('year', new Date().getFullYear())
    const month = inject<number>('month', Number(new Date().getMonth()) + 1)
    const day = inject<number>('day', new Date().getDate())
    const locale = inject<string>('locale', 'en-US')
    const { events } = toRefs<any>(props)
    
    const getShortTime = (dateStr: string) => {
      const timeArr: string[] = dateStr.split(/\s|,|\:|-|T|Z/g).filter((i: string) => i !== '')
      return `${timeArr[3]}:${timeArr[4]}`
    }
    
    return {
      year,
      month,
      day,
      events,
      getShortTime
    }
  }
})
</script>
