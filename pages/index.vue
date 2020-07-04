<template>
  <main class="main">
    <section class="landing">
      <ul>
        <li class="menu-Item " @click="toggleAllSections">
          <h1 class="cursorInteract">Rutger van den Berg</h1>
        </li>
      </ul>
    </section>
    <transition name="section">
      <section v-show="menuOpen" class="menu">
        <ul class="content">
          <li class="menu-Item" @click="aboutOpen = !aboutOpen">
            <p class="cursorInteract">Over</p>
          </li>
          <li class="menu-Item cursorInteract" @click="workOpen = !workOpen">
            <p class="cursorInteract">Werk</p>
          </li>
          <li class="menu-Item cursorInteract" @click="newsOpen = !newsOpen">
            <p class="cursorInteract">Nieuws</p>
          </li>
          <li
            class="menu-Item cursorInteract"
            @click="contactOpen = !contactOpen"
          >
            <p class="cursorInteract">Contact</p>
          </li>
        </ul>
      </section>
    </transition>
    <transition name="section">
      <section v-if="aboutOpen" class="about">
        <component
          :is="blok.component | dashify"
          v-for="blok in aboutList"
          :key="blok._uid"
          :blok="blok"
          class="content"
        ></component>
      </section>
    </transition>
    <!-- <section v-if="newsOpen" class="news">
      <component
        :is="blok.component | dashify"
        v-for="blok in newsList"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </section>
    <section v-if="contactOpen" class="contact">
      <component
        :is="blok.component | dashify"
        v-for="blok in contactList"
        :key="blok._uid"
        :blok="blok"
      ></component>
    </section> -->
  </main>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview],
  asyncData(context) {
    return context.app.$storyapi
      .get("cdn/stories/", {
        version: process.env.NODE_ENV == "production" ? "published" : "draft"
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: "Failed to receive content form api"
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  },
  data() {
    return {
      stories: { content: {} },
      homeList: {},
      aboutList: {},
      newsList: {},
      contactList: {},
      menuOpen: false,
      aboutOpen: false,
      workOpen: false,
      newsOpen: false,
      contactOpen: false
    }
  },
  mounted() {
    this.filterLoop(this.stories)
  },
  updated() {
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  methods: {
    toggleAllSections() {
      this.menuOpen = !this.menuOpen
      if (this.menuOpen === false) {
        this.aboutOpen = false
        this.workOpen = false
        this.newsOpen = false
        this.contactOpen = false
      }
    },
    filterLoop(array) {
      console.log("ARRAY", array)
      let homeFilterArray = array.filter(function(el) {
        if (el.name === "Home") {
          return true
        }
      })
      let newsFilterArray = array.filter(function(el) {
        if (el.name === "Nieuws") {
          return true
        }
      })
      let aboutFilterArray = array.filter(function(el) {
        if (el.name === "Over") {
          return true
        }
      })
      let contactFilterArray = array.filter(function(el) {
        if (el.name === "Contact") {
          return true
        }
      })
      this.homeList = homeFilterArray[0].content.body
      this.aboutList = aboutFilterArray[0].content.body
      this.newsList = newsFilterArray[0].content.body
      this.contactList = contactFilterArray[0].content.body
      // console.log("LOOP", this.newsList, this.homeList)
    }
  }
}
</script>
