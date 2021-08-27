<template>
  <Page sections="top-left" :section-left="true" :section-top="true">
    <template v-slot:sectionTop>
      <NavBar :menuStart="true" :menuEnd="true" class="bd-0 bdBottom-1 bdSolid bdOpacity-2 bdBlack sd-1">
        <template v-slot:menuStart>
          <strong class="txt-7">Vidie</strong>
        </template>
        <template v-slot:menuEnd>
          <DarkMode>
            <template v-slot:dark>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill none:event" viewBox="0 0 16 16">
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162z"></path>
              </svg>
            </template>
            <template v-slot:default>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sun-fill none:event" viewBox="0 0 16 16">
                <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
              </svg>
            </template>
          </DarkMode>
        </template>
      </NavBar>
    </template>
    <template v-slot:sectionLeft>
      <SideBar :menu-start="false" :menu-end="false" class="sd-2">
        <template v-slot:default>
          <h4 class="pdX-4 txtGray mgBottom-1">All Menus</h4>
          <ul class="menu">
            <li class="menuItem">
              <router-link to="/" class="menuLink primary.hover left:line-2">Dashboard</router-link>
            </li>
          </ul>
          <h4 class="pdX-4 txtGray mgBottom-1">Advanced Components</h4>
          <ul class="menu">
            <li class="menuItem">
              <router-link to="/calendar" class="menuLink primary.hover">Event Calender</router-link>
            </li>
            <li class="menuItem">
              <router-link to="/table" class="menuLink primary.hover">Data Table</router-link>
            </li>
            <li class="menuItem">
              <router-link to="/invoice" class="menuLink primary.hover">Invoice Table</router-link>
            </li>
          </ul>
          <h4 class="pdX-4 txtGray mgBottom-1">Element Components</h4>
          <!--<ul class="menu">
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Templates</a>
            </li>
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Widgets</a>
            </li>
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Navigations</a>
            </li>
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Custom Themes</a>
            </li>
          </ul>-->
          <h4 class="pdX-4 txtGray mgBottom-1">Other Components</h4>
          <!--<ul class="menu">
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Settings</a>
            </li>
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Languages</a>
            </li>
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Tools</a>
            </li>
            <li class="menuItem">
              <a href="#" class="menuLink primary.hover">Others</a>
            </li>
          </ul>-->
        </template>
      </SideBar>
    </template>
    <template v-slot:default>
      <!--<CalendarPage />-->
      <router-view></router-view>
    </template>
  </Page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Page from './components/layout/Page.vue'
import NavBar from './components/layout/NavBar.vue'
import SideBar from './components/layout/SideBar.vue'
import DarkMode from './components/layout/DarkMode.vue'
import InputPage from './pages/InputPage.vue'
import CalendarPage from './pages/CalendarPage.vue'
import PickerPage from './pages/PickerPage.vue'

export default defineComponent({
  name: 'App',
  components: {
    Page,
    NavBar,
    SideBar,
    DarkMode,
    InputPage,
    CalendarPage,
    PickerPage
  }
})
</script>
