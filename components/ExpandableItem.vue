<template>
  <div
    v-editable="blok"
    class="expandable-Item"
    :class="{ active: isOpen }"
    @click="isOpen = !isOpen"
  >
    <div class="expandable-Item_Title cursorInteract">
      <!-- prettier-ignore -->
      <div class="icon icon-Drop" v-html="require('~/assets/images/icon-drop.svg?include')" />
      <h1 v-if="blok.title" class="cursorInteract">{{ blok.title }}</h1>
      <h4 v-if="blok.medium">{{ blok.medium }}</h4>
    </div>
    <div v-show="isOpen" class="expandable-Item_Content">
      <markdown-item :input="blok.text" />
      <h4 v-if="blok.mention">Ism {{ blok.mention }}</h4>
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
    console.log("EXP ITEM", this.blok)
  }
}
</script>

<style lang="sass">
@import '~/assets/styles/variables.sass'

.expandable-Item
  .markdown, .markdown p, .markdown a, p, a, .icon, h4, h1, h2, h3
    display: inline
  .expandable-Item_Title
    display: flex
    opacity: $opacity-links
    transition: opacity $hover-nav
  &.active
    .expandable-Item_Title
      opacity: 1
    .icon
      svg
        transform: rotate(45deg)
  &:hover
    .expandable-Item_Title
      opacity: 1

  &_Content
    margin-left: 2rem
    margin-bottom: .5rem
</style>
