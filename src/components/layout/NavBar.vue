<template>
  <nav class="navBar dark zi-3">
    <div :class="containerBar()">
      <div class="navMenuStart" v-if="menuStart">
        <slot name="menuStart"></slot>
      </div>
      <div class="navMenuCenter" v-if="menuCenter">
        <slot name="menuCenter"></slot>
      </div>
      <div class="navMenuFill" v-else>
        <slot></slot>
      </div>
      <div class="navMenuEnd" v-if="menuEnd">
        <slot name="menuEnd"></slot>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { $string as useString } from 'alga-js'

export default defineComponent({
  name: 'NavBar',
  props: {
    container: {
      type: [String, Boolean],
      default: 'fluid'
    },
    menuStart: {
      type: Boolean,
      default: true
    },
    menuCenter: {
      type: Boolean,
      default: false
    },
    menuEnd: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const containerBar = () => {
      let container
      if(props.container === true) {
        container = 'container'
      } else if(props.container === false) {
        container = 'navWrapper'
      } else {
        container =  'container'+useString.capitalize(props.container)
      }
      return container
    }
    
    return {
      containerBar
    }
  }
})
</script>
