<template>
  <main>
    <div class="background" :class="pageType">
      <div class="circle"></div>
      <div class="circleDeux"></div>
      <div class="blur"></div>
    </div>
    <transition name="menu">
      <Nav v-if="navActive" class="nav-Fixed" />
    </transition>
    <transition name="menu">
      <Nav v-if="navActive" class="nav-Normal" />
    </transition>
    <transition name="normal" mode="in-out">
      <nuxt></nuxt>
    </transition>
    <transition name="landing">
      <div v-show="landing" class="landing" @click="toggleLanding">
        <!-- prettier-ignore -->
        <h1 class="cursorInteract">Rutger van den Berg</h1>
      </div>
    </transition>
    <div class="cursor"></div>
  </main>
</template>

<script>
import gsap from "gsap"
import Nav from "~/components/Nav.vue"

export default {
  components: {
    Nav
  },
  data() {
    return {
      pageType: "initial",
      landing: false,
      transitionName: "",
      navActive: ""
    }
  },
  watch: {
    $route() {
      this.checkPageType()
      this.checkNav()
    }
  },
  mounted() {
    this.checkLanding()
    this.customCursor()
    this.checkNav()
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
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  destroyed() {
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.removeEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  methods: {
    // Landing function
    checkLanding() {
      if (this.$route.name === "index") {
        this.landing = true
      } else {
        this.landing = false
      }
    },
    toggleLanding() {
      this.landing = false
    },
    // Used for background styling
    checkPageType() {
      if (this.$route.name === "index") {
        this.pageType = "index"
      } else if (this.$route.name === "profiel") {
        this.pageType = "profiel"
      } else if (this.$route.name === "werk") {
        this.pageType = "werk"
      } else if (this.$route.name === "blog") {
        this.pageType = "blog"
      } else if (this.$route.name === "blog-slug") {
        this.pageType = "blog-slug"
      } else {
        this.pageType = "error"
      }
    },
    // Cursor functions
    customCursor() {
      let cursor = document.querySelector(".cursor")
      function moveCursor(e) {
        gsap.to(cursor, 0.1, {
          left: e.clientX,
          top: e.clientY
        })
      }
      document.addEventListener("mousemove", moveCursor)
    },
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
    },
    // Used to disable menu
    checkNav() {
      if (this.$route.name !== "blog-slug") {
        this.navActive = true
      } else {
        this.navActive = false
      }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/styles/variables.sass'

.nav-Normal
  pointer-events: none

.landing
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  background: rgba(0,0,0,0.01)
  backdrop-filter: blur(5px)
  display: flex
  justify-content: center
  align-items: center
  z-index: 900
  h1
    font-size: 5vw
    letter-spacing: .03em

.background
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  overflow: hidden
  pointer-events: none
  z-index: -100
  .circle
    position: absolute
    top: 0
    right: 0
    transform: translate(45%, -50%)
    width: 200vmin
    height: 200vmin
    background: $gradient-secondary
    border-radius: 100000000px
    transition: transform 1s ease-in-out 2s
    will-change: transform
  .circleDeux
    position: absolute
    top: 100%
    left: 50%
    transform: translate(-50%, -50%)
    width: 50vmin
    height: 50vmin
    background: #7F8CBB
    opacity: .66
    border-radius: 100000000px
    transition: top 1s ease-in-out, left 1.25s ease-in-out 2s
    will-change: top, left
  .blur
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    background: white
    background: rgba(0,0,0,0.01)
    backdrop-filter: blur(100px)
  &.initial
    .circle
      transform: translate(55%, -50%)
    .circleDeux
      top: 100%
      left: 45%
  &.index
    .circle
      transform: translate(45%, -50%)
    .circleDeux
      top: 100%
      left: 55%
  &.profiel
    .circle
      transform: translate(75%, -40%)
    .circleDeux
      top: 75%
      left: 75%
  &.werk
    .circle
      transform: translate(65%, -0%)
    .circleDeux
      top: 90%
      left: 55%
  &.blog
    .circle
      transform: translate(60%, -50%)
    .circleDeux
      top: 100%
      left: 40%
  &.blog-slug
    .circle
      transform: translate(90%, -25%)
    .circleDeux
      top: 100%
      left: 90%
  &.error
    .circle
      transform: translate(-50%, -40%)
</style>
