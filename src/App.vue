<template>
  <Page sections="top-left">
    <template v-slot:sectionTop>
      <NavBar class="green" :menu-start="true" :menu-end="true">
        <template v-slot:menuStart>
          Judul
        </template>
        <template v-slot:default>
          Home
        </template>
        <template v-slot:menuEnd>
          Page
        </template>
      </NavBar>
    </template>
    <template v-slot:sectionLeft>
      <SideBar type="shrinkable">
        <template v-slot:default>
          This is menu
        </template>
      </SideBar>
    </template>
    <template v-slot:sectionMain>
      <div class="container px:width-75 y:margin-15">
        <TagsPage />
      </div>
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Page from './components/layout/Page.vue'
import NavBar from './components/layout/NavBar.vue'
import SideBar from './components/layout/SideBar.vue'
import TagsPage from './pages/TagsPage.vue'

export default defineComponent({
  name: 'App',
  components: {
    Page,
    NavBar,
    SideBar,
    TagsPage
  }
})
</script>
