<template>
  <div v-editable="blok" class="hyperlink">
    <!-- prettier-ignore -->
    <nuxt-link to="" class="icontag cursorInteract" tag="div">
          <div
            v-if="blok.hyperlink"
            v-html="require('~/assets/images/icon-contact.svg?include')"
          />
      </nuxt-link>
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
  mounted() {}
}
</script>

<style lang="sass" scoped>
.hyperlink
  display: flex
  margin-bottom: .5rem
  .icontag
    border: 0
</style>
