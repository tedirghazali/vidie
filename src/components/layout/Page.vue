<template>
  <div :class="pageLayout()">
    <div class="top:section" v-if="sectionTop">
      <slot name="sectionTop"></slot>
    </div>
    <div class="left:section" v-if="sectionLeft">
      <slot name="sectionLeft"></slot>
    </div>
    <div class="main:section">
      <slot></slot>
    </div>
    <div class="right:section" v-if="sectionRight">
      <slot name="sectionRight"></slot>
    </div>
    <div class="bottom:section" v-if="sectionBottom">
      <slot name="sectionBottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Page',
  props: {
    sections: {
      type: String,
      default: 'full'
    },
    sectionTop: {
      type: Boolean,
      default: true
    },
    sectionLeft: {
      type: Boolean,
      default: true
    },
    sectionRight: {
      type: Boolean,
      default: true
    },
    sectionBottom: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    const pageLayout = () => {
      let page
      if(props.sections === '') {
        page = 'page'
      } else {
        page = props.sections + ':page'
      }
      return page
    }
    
    return {
      pageLayout
    }
  }
})
</script>
