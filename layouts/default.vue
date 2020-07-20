<template>
  <main>
    <div class="background" :class="pageType">
      <div class="circle"></div>
      <div class="circleDeux"></div>
      <div class="blur"></div>
    </div>
    <Nav class="nav-Normal" />
    <Nav class="nav-Fixed" />
    <nuxt />
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
      landing: true
    }
  },
  watch: {
    $route() {
      this.checkPageType()
      this.removeChangeCursor()
      this.customCursor()
    }
  },
  mounted() {
    this.customCursor()
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
    this.removeChangeCursor()
    this.customCursor()
    // console.log("PAGETYPE UPDATED", this.pageType)
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item => item.removeEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll(".cursorInteract")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  destroyed() {
    this.removeChangeCursor()
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
    toggleLanding() {
      this.landing = !this.landing
    },
    checkPageType() {
      if (this.$route.name === "index") {
        this.pageType = "index"
      } else if (this.$route.name === "profiel") {
        this.pageType = "profiel"
      } else if (this.$route.name === "werk") {
        this.pageType = "werk"
      } else if (this.$route.name === "blog") {
        this.pageType = "blog"
      } else {
        this.pageType = "error"
      }
      // console.log("PAGETYPE", this.pageType, this.$route)
    },
    customCursor() {
      let cursor = document.querySelector(".cursor")
      function moveCursor(e) {
        gsap.to(cursor, 0, {
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
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/styles/variables.sass'

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
  z-index: 999
  h1
    font-size: 5vw
    // letter-spacing: -.01em
    letter-spacing: .03em

.background
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  overflow: hidden
  pointer-events: none
  // background-color: #D2D2D2
  .circle
    position: absolute
    top: 0
    right: 0
    transform: translate(45%, -50%)
    width: 200vmin
    height: 200vmin
    background: $gradient-secondary
    border-radius: 100000000px
    transition: transform 1s ease-in-out
  .circleDeux
    position: absolute
    top: 100%
    left: 50%
    transform: translate(-50%, -50%)
    width: 50vmin
    height: 50vmin
    background: #7F8CBB
    opacity: .66
    // background: #B9B3A6
    // background: #72F1F2
    border-radius: 100000000px
    transition: top 1s ease-in-out, left 1.25s ease-in-out
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
  &.error
    .circle
      transform: translate(-50%, -40%)
</style>
