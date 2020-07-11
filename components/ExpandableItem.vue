<template>
  <div v-editable="blok" class="expandable-Item" :class="{ active: isOpen }">
    <div class="expandable-Item_Title cursorInteract" @click="isOpen = !isOpen">
      <!-- prettier-ignore -->
      <div class="icon icon-Drop" v-html="require('~/assets/images/icon-drop.svg?include')" />
      <h1 v-if="blok.title">{{ blok.title }}</h1>
      <!-- <h4 v-if="blok.medium">{{ blok.medium }}</h4> -->
      <div v-if="blok.date" class="expandable-Item_News">
        <div>
          <div></div>
        </div>
        <div>
          <p>{{ theTime }}</p>
        </div>
      </div>
    </div>
    <div v-show="isOpen" class="expandable-Item_Content">
      <markdown-item v-if="blok.text" :input="blok.text" />
      <h4 v-if="blok.mention">Ism {{ blok.mention }}</h4>
      <!-- prettier-ignore -->
      <a :href="blok.hyperlink" target="_blank">
        <div
          v-if="blok.hyperlink"
          class="icon icon-Hyperlink"
          v-html="require('~/assets/images/icon-north-east.svg?include')"
        />
      </a>
    </div>
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
    console.log("EXP ITEM", this.blok)
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
  .markdown, .markdown p, .markdown a, p, a, h4, h1, h2, h3
    display: inline
  &_Title
    display: flex
    opacity: $opacity-links
    transition: opacity $hover-nav
  &_Image
    pointer-events: none
    // opacity: 0
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
        border-bottom: 1px dotted $color
        transform: translateY(-.58rem)
  &.active
    .expandable-Item_Title
      opacity: 1
      .icon
        svg
          transform: rotate(45deg)
  &:hover
    .expandable-Item_Title, .expandable-Item_Image
      opacity: 1
  &_Content
    margin-left: 2rem
    // margin-bottom: .5rem
    .icon
      display: inline-block
</style>
