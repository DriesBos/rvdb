<template>
  <div
    v-editable="blok"
    class="expandable-Item"
    :class="{ active: isOpen }"
    @click="isOpen = !isOpen"
  >
    <div>
      <h1>{{ blok.title }}</h1>
    </div>
    <div v-show="isOpen">
      <markdown-item :input="blok.text" />
      <p v-if="blok.mention">{{ blok.mention }}</p>
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
  .markdown, .markdown p, .markdown a, p, a, .icon
    display: inline
  .icon
    transition: color .16s ease
    color: currentColor
    height: 1rem
  h1
    transition: color .16s ease
  &.active
    h1
      color: black
  &:hover
    h1
      color: black
</style>
