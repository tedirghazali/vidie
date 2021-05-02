<template>
  <nav class="nav:bar dark">
    <div :class="[containerBar(), 'mobile']">
      <div class="start:bar-menu mobile" v-show="menuStart">
        <slot name="menuStart"></slot>
      </div>
      <div class="center:bar-menu" v-if="menuCenter">
        <slot name="menuCenter"></slot>
      </div>
      <div class="fill:bar-menu" v-else>
        <slot></slot>
      </div>
      <div class="end:bar-menu tablet" v-show="menuEnd">
        <slot name="menuEnd"></slot>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  props: {
    container: {
      type: [String, Boolean],
      default: 'fluid'
    },
    menuStart: {
      type: Boolean,
      default: false
    },
    menuCenter: {
      type: Boolean,
      default: false
    },
    menuEnd: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const containerBar = () => {
      let container
      if(props.container === true) {
        container = 'container'
      } else if(props.container === false) {
        container = 'bar-wrapper'
      } else {
        container = props.container + ':container'
      }
      return container
    }
    
    return {
      containerBar
    }
  }
})
</script>
