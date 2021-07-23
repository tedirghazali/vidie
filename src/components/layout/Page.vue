<template>
  <div :class="pageLayout()">
    <div class="sectionTop" v-if="sectionTop">
      <slot name="sectionTop"></slot>
    </div>
    <div class="sectionLeft" v-if="sectionLeft">
      <slot name="sectionLeft"></slot>
    </div>
    <div class="sectionMain">
      <slot></slot>
    </div>
    <div class="sectionRight" v-if="sectionRight">
      <slot name="sectionRight"></slot>
    </div>
    <div class="sectionBottom" v-if="sectionBottom">
      <slot name="sectionBottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { $string as useString } from 'alga-js'

export default defineComponent({
  name: 'Page',
  props: {
    sections: {
      type: String,
      default: 'full'
    },
    sectionTop: {
      type: Boolean,
      default: false
    },
    sectionLeft: {
      type: Boolean,
      default: false
    },
    sectionRight: {
      type: Boolean,
      default: false
    },
    sectionBottom: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const pageLayout = () => {
      let page
      if(props.sections === '') {
        page = 'page'
      } else {
        page = 'page'+useString.capitalize(props.sections.replace('-', ' '), 'multiple').replace(' ', '').trim()
      }
      return page
    }
    
    return {
      pageLayout
    }
  }
})
</script>
