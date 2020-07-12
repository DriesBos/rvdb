<template>
  <main>
    <div class="background" :class="pageType">
      <div class="circle"></div>
      <div class="blur"></div>
    </div>
    <Nav class="nav-Normal" />
    <Nav class="nav-Fixed" />
    <nuxt />
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
      pageType: "index"
    }
  },
  watch: {
    $route() {
      this.checkPageType()
      this.removeChangeCursor()
    }
  },
  mounted() {
    this.customCursor()
    this.checkPageType()
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

.background
  position: absolute
  left: 0
  top: 0
  right: 0
  bottom: 0
  overflow: hidden
  pointer-events: none
  background-color: #D2D2D2
  .circle
    position: absolute
    top: 0
    right: 0
    transform: translate(50%, -40%)
    width: 200vmin
    height: 200vmin
    background: $gradient-secondary
    border-radius: 100000000px
    transition: transform 1s ease-in-out
  .blur
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: white
    background: rgba(0,0,0,0.01)
    backdrop-filter: blur(150px)
  &.profiel
    .circle
      transform: translate(75%, -40%)
  &.werk
    .circle
      transform: translate(65%, -0%)
  &.blog
    .circle
      transform: translate(70%, -20%)
  &.error
    .circle
      transform: translate(-50%, -40%)
</style>
