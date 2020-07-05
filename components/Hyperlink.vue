<template>
  <div v-editable="blok" class="hyperlink">
    <div
      class="icon"
      v-html="require('~/assets/images/icon-east.svg?include')"
    />
    <markdown-item :input="blok.hyperlink" />
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
  mounted() {
    console.log("HYPERLINK", this.blok)
  }
}
</script>

<style lang="sass" scoped>
.hyperlink
  display: flex
  .icon
    transition: color .16s ease
    height: 100%
    margin-right: .5rem
  &:hover
    .icon
      color: black
</style>
