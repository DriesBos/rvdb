<template>
  <main>
    <div class="background">
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
  .circle
    position: absolute
    top: 0
    right: 0
    transform: translate(50%, -40%)
    width: 200vmin
    height: 200vmin
    background: $gradient-secondary
    border-radius: 100000000px
  .blur
    position: absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background: white
    background: rgba(0,0,0,0.01)
    backdrop-filter: blur(200px)
</style>
