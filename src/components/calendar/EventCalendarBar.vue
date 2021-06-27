<template>
  <div class="flexBetween itemsCenter">
    <div class="btnGroup">
      <button type="button" class="btn bd-1 flexCenter itemsCenter darker">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="eventNone" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </button>
      <button type="button" class="btn bd-1 flexCenter itemsCenter darker">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="eventNone" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
      <button type="button" class="btn bd-1 darker">Today</button>
    </div>
    <div class="txtBold txt-6 txtOpacity-7 txtBlack">June, 2021</div>
    <div class="btnGroup">
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'yearly'}, 'darker']" @click="toggledEvent('yearly')">Year</button>
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'monthly'}, 'darker']" @click="toggledEvent('monthly')">Month</button>
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'weekly'}, 'darker']" @click="toggledEvent('weekly')">Week</button>
      <button type="button" :class="['btn', 'bd-1', {'active': toggled === 'daily'}, 'darker']" @click="toggledEvent('daily')">Day</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'EventCalendarBar',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    toggle: {
      type: String,
      default: (typeof window === 'object' && 'localStorage' in window && localStorage.getItem('toggledCalendar')) ? localStorage.getItem('toggledCalendar') : 'monthly'
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
    }
  },
  emits: ['update:modelValue', 'update:toggle', 'action'],
  setup(props, context) {
    const toggled = ref<string>('')
    
    toggled.value = props.toggle
    
    const toggledEvent = (toggleArg: string) => {
      toggled.value = toggleArg
      context.emit('update:toggle', toggleArg)
      context.emit('action')
      if(typeof window === 'object' && 'localStorage' in window) {
        localStorage.setItem('toggledCalendar', toggleArg)
      }
    }
    
    /*onMounted(() => {
      if(typeof window === 'object' && 'onstorage' in window) {
        window.onstorage = (e) => {
          toggled.value = e.newValue
        }
      }
    })*/
    
    return {
      toggled,
      toggledEvent
    }
  }
})
</script>
