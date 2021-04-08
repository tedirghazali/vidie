<template>
  <div class="tag:input" @click="focusInput">
    <div v-for="(tag, index) in tags" :key="index" class="tag-group">
      <span class="tag green" @dblclick="updateTag(tag, index)">{{ tag }}</span>
      <span class="tag tag-delete secondary" @click="removeTag(index)"></span>
    </div>
    <input type="text" v-model="tag" ref="tagInput" class="tag:input-control" list="tag-list" :placeholder="placeholder" @input="autoWidth($event), createTag($event)" @keyup.enter="createTag($event)">
    <datalist id="tag-list">
      <option v-for="(wt, i) in whiteTags" :key="i">{{ wt }}</option>
    </datalist>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue'

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
    const tags = ref([])
    const tag = ref('')
    const whiteTags = ref([])
    const tagInput = ref('')
    
    const { datalist, separator, whitelist, blacklist, placeholder } = toRef(props)
    
    tags.value = props.datalist
    whiteTags.value = props.whitelist
    
    const focusInput = () => {
      tagInput.value.focus()
    }
    
    const autoWidth = (e) => {
      const tagControlHidden = document.createElement('div')
      tagControlHidden.classList.add('tag:input-control', 'hidden?tag:input-control')

      const tagString = tag.value || e.target.getAttribute('placeholder') || ''
      tagControlHidden.innerHTML = tagString.replace(/ /g, '&nbsp;').trim()
      document.body.appendChild(tagControlHidden)

      e.target.style.setProperty('width', Math.ceil(window.getComputedStyle(tagControlHidden).width.replace('px', '')) + 1 + 'px')
      tagControlHidden.remove()
    }
    
    const createTag = (e) => {
      if(tag.value.includes(props.separator) || e.key === 'Enter') {
        const filterTag = tag.value.replace(new RegExp(escapeRegex(props.separator), 'g'), '').trim()
        if(!tags.value.includes(filterTag) && !props.blacklist.includes(filterTag)) {
          tags.value.push(filterTag)
          if(whiteTags.value.includes(filterTag)) {
            whiteTags.value = whiteTags.value.filter(w => w !== filterTag)
          }
        }
        emitTag(filterTag)
        tag.value = ''
      }
      autoWidth(e)
    }
    
    const updateTag = (tag, index) => {
      tag.value = tag
      removeTag(index)
    }
    
    const removeTag = (index) => {
      tags.value.splice(index, 1)
    }
      
    const escapeRegex = (value) => {
      return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
    }
      
    const emitTag = (newTag) => {
      context.emit('update:modelValue', newTag)
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
      placeholder
    }
  }
})
</script>
