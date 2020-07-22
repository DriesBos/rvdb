<template>
  <div v-editable="blok" class="expandable-Item" :class="{ active: isOpen }">
    <div class="expandable-Item_Title cursorInteract" @click="isOpen = !isOpen">
      <!-- prettier-ignore -->
      <!-- <div class="icon icon-Drop" v-html="require('~/assets/images/icon-drop.svg?include')" /> -->
      <!-- <div class="expandable-Item_Dropdown">
        <div></div>
      </div>-->
      <!-- prettier-ignore -->
      <h1 v-if="blok.title" class="expandable-Item_Title_Title">{{ blok.title }}</h1>
      <div v-if="blok.medium" class="tag">
        <h4>{{ blok.medium }}</h4>
      </div>
      <div v-if="blok.date" class="expandable-Item_News">
        <div>
          <div></div>
        </div>
        <div>
          <p>{{ theTime }}</p>
        </div>
      </div>
    </div>
    <!-- <transition name="fade"> -->
    <!-- prettier-ignore -->
    <div v-show="isOpen" class="expandable-Item_Content" :class="{ active: isOpen }">
      <markdown-item v-if="blok.text" :input="blok.text" />
      <div v-if="blok.medium" class="tag">
        <h4>{{ blok.medium }}</h4>
      </div>
      <div v-if="blok.mention" class="tag">
        <h4>Ism {{ blok.mention }}</h4>
      </div>
      <!-- prettier-ignore -->
      <a :href="blok.hyperlink" class="icon-LinkWrapper" target="_blank">
        <div
          v-if="blok.hyperlink"
          class="icon icon-Hyperlink"
          v-html="require('~/assets/images/icon-north-east.svg?include')"
        />
      </a>
    </div>
    <!-- </transition> -->
    <div v-if="blok.image" class="backgroundImage expandable-Item_Image">
      <div class="backgroundImage-Container">
        <img :src="blok.image" />
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownItem from "@/components/MarkdownItem.vue"

export default {
  components: {
    "markdown-item": MarkdownItem
  },
  props: {
    blok: Object
  },
  data() {
    return {
      isOpen: false,
      theTime: ""
    }
  },
  mounted() {
    this.formatTime()
  },
  methods: {
    formatTime() {
      let time = this.blok.date
      if (time) {
        let rightTime = time.replace("00:00", "")
        this.theTime = rightTime
      }
    }
  }
}
</script>

<style lang="sass">
@import '~/assets/styles/variables.sass'

.expandable-Item
  .markdown p, .markdown a, p, a, h4, h1, h2, h3
    display: inline
  &_Title
    display: flex
    align-items: flex-start
    opacity: $opacity-links
    transition: opacity $hover-nav
    h1
      // line-height: 1.75
      margin-right: .5rem
  &_Image
    pointer-events: none
    opacity: 0
  &_News
    display: flex
    justify-content: space-between
    flex-grow: 1
    align-items: flex-end
    > div:first-child
      flex-grow: 1
      padding-left: .5rem
      padding-right: .5rem
      > div
        width: 100%
        // border-bottom: 1px dotted $color
        transform: translateY(-.58rem)
  &_Dropdown
    margin-top: 4px
    margin-bottom: 8px
    margin-right: 6px
    > div
      width: 5px
      height: 100%
      border-left: 1px solid black
      // border-bottom: 1px solid black
  &_Content
    margin-left: 2rem
    margin-bottom: 1.5rem
    .icon
      display: inline-block
  &.active
    .expandable-Item_Title
      opacity: 1
      .icon
        svg
          transform: rotate(90deg)
      h1
        // border-bottom: 1px solid black
      .tag
        opacity: 0
    .expandable-Item_Content
      .tag
        opacity: 1
  &:hover
    .expandable-Item_Title, .expandable-Item_Image
      opacity: 1
    h1
      // border-bottom: 1px solid black
</style>
