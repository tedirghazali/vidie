<template>
  <div ref="toggleRef" @click="toggleEvent">
    <div v-if="darkMode">
      <slot name="dark"></slot>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'

export default defineComponent({
  name: 'DarkMode',
  props: {
    
  },
  setup() {
    const darkMode = ref<boolean>(false)
    const toggleRef = ref<any>(null)
    const toggleMode = ref<boolean>(false)
    
    if(localStorage.getItem('preferredDarkMode') && localStorage.getItem('preferredDarkMode') === 'true') {
      nextTick(() => {
        toggleMode.value = true
        toggleSwitch()
      })
    } else {
      if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        nextTick(() => {
          toggleMode.value = true
          toggleSwitch()
        })
      }
    }
    
    const darkAttrs = () => {
      if(darkMode.value) {
        document.documentElement.setAttribute('data-mode', 'dark')
        document.body.classList.add('darker')
        localStorage.setItem('preferredDarkMode', 'true')
      } else {
        document.documentElement.removeAttribute('data-mode')
        localStorage.setItem('preferredDarkMode', 'false')
      }
    }
    
    const toggleSwitch = () => {
      if(toggleMode.value) {
        darkMode.value = true
        darkAttrs()
        toggleMode.value = false
      } else {
        darkMode.value = false
        darkAttrs()
        toggleMode.value = true
      }
    }
   
    const toggleEvent = () => {
      nextTick(() => {
        toggleSwitch()
      })
    }
    
    return {
      toggleRef,
      toggleEvent,
      darkMode
    }
  }
})
</script>
