<template>
  <div v-editable="blok" class="hyperlink">
    <!-- prettier-ignore -->
    <markdown-item :input="blok.hyperlink" />
    <nuxt-link to="" class="icontag cursorInteract" tag="div">
      <div
        v-if="blok.hyperlink"
        v-html="require('~/assets/images/icon-hyperlink.svg?include')"
      />
    </nuxt-link>
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
  mounted() {}
}
</script>

<style lang="sass" scoped>
.hyperlink
  display: flex
  align-items: center
  flex-wrap: wrap
  margin-bottom: .5rem
  .icontag
    margin-left: .5rem
</style>
