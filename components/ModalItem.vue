<template>
  <!-- prettier-ignore -->
  <div v-editable="blok" class="news-Item" :class="{ active: isOpen }" @click="isOpen = !isOpen">
    <div class="news-Item_Title cursorInteract">
      <div>
        <div class="icon icon-Drop" v-html="require('~/assets/images/icon-drop.svg?include')" />
        <h1 v-if="blok.title">{{ blok.title }}</h1>
        <!-- <h4 v-if="blok.medium">{{ blok.medium }}</h4> -->
      </div>
      <div class="news-Item_TitleLine"></div>
      <div>
        <p>01-01-2020</p>
      </div>
    </div>
    <div v-show="isOpen" class="news-Item_Content">
      <markdown-item :input="blok.text" />
      <h4 v-if="blok.mention">{{ blok.hyperlink }}</h4>
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
      isOpen: false
    }
  },
  mounted() {
    // console.log("NEWS ITEM", this.blok)
  }
}
</script>

<style lang="sass">
@import '~/assets/styles/variables.sass'

.news-Item
  &_Title
    display: flex
    justify-content: space-between
  &_TitleLine
    flex-grow: 1
    border-bottom: 1px dotted $color
    transform: translateY(-.6rem)
    margin-left: .5rem
    margin-right: .5rem
  .markdown, .markdown p, .markdown a, p, a, .icon, h4, h1, h2, h3
    display: inline
  .icon
    transition: color .16s ease
    color: currentColor
    height: 1rem
  &.active
    h1
      color: black
  &:hover
    h1
      color: black
  &_Content
    margin-left: 2rem
    margin-bottom: .5rem
</style>
