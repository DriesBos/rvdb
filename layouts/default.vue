<template>
  <main lang="nl">
    <div class="background" :class="pageType">
      <div class="circle"></div>
      <div class="circleDeux"></div>
    </div>
    <transition name="menu">
      <Nav v-if="navActive" />
    </transition>
    <transition name="normal" mode="in-out">
      <nuxt></nuxt>
    </transition>
    <transition name="landing">
      <div v-show="landing" class="landing" @click="toggleLanding">
        <!-- prettier-ignore -->
        <div class="landing-Title">
          <h1 class="cursorInteract">Rutger van den Berg</h1>
          <h2>onderzoeker — spreker — schrijver</h2>
        </div>
      </div>
    </transition>
    <div class="cursor"></div>
  </main>
</template>

<script>
import Nav from "~/components/Nav.vue"
import cursorInteraction from "@/mixins/cursorInteraction"

export default {
  components: {
    Nav
  },
  mixins: [cursorInteraction],
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
    this.checkNav()
    this.checkPageType()
  },

  methods: {
    // Landing function
    checkLanding() {
      // console.log("LANDING")
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
      } else if (this.$route.name === "contact") {
        this.pageType = "contact"
      } else {
        this.pageType = "error"
      }
      console.log(this.$route, this.pageType)
    },
    // Used to disable menu
    checkNav() {
      if (
        this.$route.name === "index" ||
        this.$route.name === "profiel" ||
        this.$route.name === "werk" ||
        this.$route.name === "blog" ||
        this.$route.name === "contact"
      ) {
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
  backdrop-filter: blur(50px)
  display: flex
  flex-direction: column
  justify-content: space-around
  align-items: center
  z-index: 999
  h1, h2, h3
    text-align: center
  h1
    font-size: 5vw
    letter-spacing: .03em
    border-bottom: 4px solid black
    padding-bottom: .2em
    margin-bottom: .6em
    @media all and (max-width: $breakpoint-mobile)
      font-size: 7vw
  h2
    font-size: 28px
    margin-bottom: .2em
    @media all and (max-width: $breakpoint-mobile)
      font-size: 3.5vw
  h3
    font-size: 18px
    @media all and (max-width: $breakpoint-mobile)
      font-size: 3.5vw

.background
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  overflow: hidden
  pointer-events: none
  z-index: 0
  .circle
    position: absolute
    top: 0
    right: 0
    transform: translate(50%, -50%)
    width: 200vmin
    height: 200vmin
    background: $gradient-secondary
    border-radius: 100000000px
    transition: transform .9s ease-out
    will-change: transform
    opacity: .9
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
    transition: top .9s ease-out, left .9s ease-out
    will-change: top, left
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
      top: 105%
      left: 55%
  &.blog-slug
    .circle
      transform: translate(90%, -25%)
    .circleDeux
      top: 100%
      left: 90%
  &.contact
    .circle
      transform: translate(60%, -60%)
    .circleDeux
      top: 40%
      left: 45%
  &.error
    .circle
      transform: translate(50%, 40%)
    .circleDeux
      top: 100%
      left: 100%
</style>
