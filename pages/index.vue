<template>
  <main class="main" :class="background">
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
import gsap from "gsap"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

gsap.registerPlugin(CSSRulePlugin)

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
      contactOpen: false,
      background: "backgroundOne"
    }
  },
  mounted() {
    this.backgroundColor()
    this.setBackgroundColor()
    this.filterLoop(this.stories)
    document.addEventListener("click", this.backgroundColor)
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  updated() {
    this.backgroundColor()
    this.setBackgroundColor()
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
    backgroundColor() {
      if (
        this.aboutOpen ||
        this.contactOpen ||
        this.newsOpen ||
        this.workOpen
      ) {
        this.background = 3
      } else if (this.menuOpen) {
        this.background = 2
      } else {
        this.background = 1
      }
    },
    setBackgroundColor() {
      // var el = document.getElementsByTagName("main")
      if (this.background == 3) {
        console.log("setBG 3", this.background)
        gsap.to(CSSRulePlugin.getRule("main"), {
          cssRule: {
            backgroundImage:
              "radial-gradient(48.25% 116.75% at 108.86% 50%, #FFFFFF 0%, #F34988 44.88%, #F22828 73.53%, #C4C4C4 100%)"
          }
        })
      }
      if (this.background == 2) {
        console.log("setBG 2", this.background)
        gsap.to(CSSRulePlugin.getRule("main"), {
          cssRule: {
            backgroundImage:
              "radial-gradient(67.57% 163.51% at 108.86% 50%, #FFFFFF 0%, #F34988 44.88%, #F22828 73.53%, #C4C4C4 100%)"
          },
          onUpdateParams: ["main"]
        })
      }
      if (this.background == 1) {
        console.log("setBG 1", this.background)
        gsap.to(CSSRulePlugin.getRule("main"), {
          cssRule: {
            backgroundImage:
              "radial-gradient(90.61% 219.25% at 108.86% 50%, #FFFFFF 0%, #F34988 44.88%, #F22828 73.53%, #C4C4C4 100%)"
          }
        })
      }
    },
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
    }
  }
}
</script>
