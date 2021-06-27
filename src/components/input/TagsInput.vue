<template>
  <div class="picker">
    <div class="tag:input" @click="focusInput">
      <div v-for="(tag, index) in tags" :key="index" class="tag-group">
        <span class="tag" @dblclick="updateTag(tag, index)">{{ tag }}</span>
        <span class="tag tag-delete" @click="removeTag(index)"></span>
      </div>
      <input type="text" v-model="tag" ref="tagInput" class="input-control" :placeholder="placeholderInput" @input="autoWidth(), createTag($event), openSuggestion(tag)" @keyup.enter="createTag($event)" @blur="closeSuggestion">
    </div>
    <transition name="tagsinput-transition" enter-active-class="animate fadeIn:animate" leave-active-class="animate fadeOut:animate">
    <div class="pickerMenu wd-100 mgTop-0 bdTop-0 pd-0 ph-20 overflowAutoY" v-show="suggestion">
      <div v-for="wt in whiteTags" :key="wt" class="pickerItem" style="--bgActive: var(--green)">{{ wt }}</div>
    </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'
import { $array as useArray } from 'alga-js'

export default defineComponent({
  name: 'TagsInput',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    datalist: {
      type: Array,
      default: []
    },
    separator: {
      type: String,
      default: ','
    },
    whitelist: {
      type: Array,
      default: []
    },
    blacklist: {
      type: Array,
      default: []
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const tags = ref<any[]>([])
    const tag = ref<string>('')
    const whiteTags = ref<any[]>([])
    const tagInput = ref<any>(null)
    const suggestion = ref<boolean>(false)
    const placeholderInput = ref<string>('')
    
    tags.value = props.datalist
    whiteTags.value = useArray.complement(props.whitelist, tags.value)
    placeholderInput.value = props.placeholder
    
    const focusInput = () => {
      tagInput.value.focus()
    }
    
    const autoWidth = () => {
      const tagHidden = document.createElement('div')
      tagHidden.classList.add('tag:input-hidden')

      const tagString = tag.value || tagInput.value.getAttribute('placeholder') || ''
      tagHidden.innerHTML = tagString.replace(/ /g, '&nbsp;').trim()
      document.body.appendChild(tagHidden)
      
      const getTagWidth = Math.ceil(Number(window.getComputedStyle(tagHidden).width.replace('px', ''))) + 1
      tagInput.value.style.setProperty('width', getTagWidth + 'px')
      tagHidden.remove()
    }
    
    const createTag = (e: any) => {
      if(tag.value.includes(props.separator) || e.key === 'Enter') {
        const filterTag: string = tag.value.replace(new RegExp(escapeRegex(props.separator), 'g'), '').trim()
        if(!tags.value.includes(filterTag) && !props.blacklist.includes(filterTag)) {
          tags.value.push(filterTag)
          if(whiteTags.value.includes(filterTag)) {
            whiteTags.value = whiteTags.value.filter(w => w !== filterTag)
          }
        }
        emitTag(filterTag)
        tag.value = ''
      }
      autoWidth()
    }
    
    const updateTag = (editTag: string, index: any) => {
      tag.value = editTag
      removeTag(index)
    }
    
    const removeTag = (index: any) => {
      tags.value.splice(index, 1)
    }
      
    const escapeRegex = (value: string) => {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
    }
      
    const emitTag = (newTag: string) => {
      context.emit('update:modelValue', newTag)
    }
    
    const openSuggestion = (tagArg: string) => {
      //if(tag.value.length >= 3) {
        setTimeout(() => {
          suggestion.value = true
        }, 5000)
      //}
    }
    
    const closeSuggestion = () => {
      setTimeout(() => {
        suggestion.value = false
      }, 300)
    }
    
    return {
      tags,
      tag,
      whiteTags,
      tagInput,
      focusInput,
      autoWidth,
      createTag,
      updateTag,
      removeTag,
      placeholderInput,
      suggestion,
      openSuggestion,
      closeSuggestion
    }
  }
})
</script>
