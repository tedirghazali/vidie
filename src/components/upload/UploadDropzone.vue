<script lang="ts" setup>

</script>

<template>
  <div class="dropzone">
    <input type="file" id="dropzoneFile" class="dropzoneFile" ref="dropzoneFile" @change="handleFiles($event)" multiple accept="image/*">
    <div class="dropzoneWrapper" @dragenter.prevent="" @dragover.prevent="" @drop.prevent="handleFiles($event)">
      <label for="dropzoneFile" class="dropzoneLabel">
        <div class="dropzoneIcon">
          <svg width="10em" height="10em" viewBox="0 0 16 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="m 8.0274054,0.49415269 a 5.53,5.53 0 0 0 -3.594,1.34200001 c -0.766,0.66 -1.321,1.52 -1.464,2.383 -1.676,0.37 -2.94199993,1.83 -2.94199993,3.593 0,2.048 1.70799993,3.6820003 3.78099993,3.6820003 h 8.9059996 c 1.815,0 3.313,-1.43 3.313,-3.2270003 0,-1.636 -1.242,-2.969 -2.834,-3.194 -0.243,-2.58 -2.476,-4.57900001 -5.1659996,-4.57900001 z m 2.3539996,5.14600001 -1.9999996,-2 a 0.5,0.5 0 0 0 -0.708,0 l -2,2 a 0.5006316,0.5006316 0 1 0 0.708,0.708 l 1.146,-1.147 v 3.793 a 0.5,0.5 0 0 0 1,0 v -3.793 l 1.146,1.147 a 0.5006316,0.5006316 0 0 0 0.7079996,-0.708 z"
              />
          </svg>
        </div>
        <div class="dropzoneBody">
          <h3 class="dropzoneTitle">Drag and drop files to upload</h3>
          <p class="dropzoneSubtitle">Your files will be added automatically</p>
          <button type="button" class="dropzoneButton">or select files</button>
        </div>
      </label>
    </div>
  </div>
</template>
