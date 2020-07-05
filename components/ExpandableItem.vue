<template>
  <div
    v-editable="blok"
    class="expandable-Item"
    :class="{ active: isOpen }"
    @click="isOpen = !isOpen"
  >
    <div class="expandable-Item_Title">
      <h1>{{ blok.title }}</h1>
      <h4>{{ blok.publicatievorm }}</h4>
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
.expandable-Item
  .markdown, .markdown p, .markdown a, p, a, .icon, h4, h1, h2, h3
    display: inline
  .icon
    transition: color .16s ease
    color: currentColor
    height: 1rem
  h1
    transition: color .16s ease
  h4
    vertical-align: text-top
    margin-left: .1rem
  &.active
    h1
      color: black
  &:hover
    h1
      color: black
  &_Content
    margin-left: 2rem
</style>
