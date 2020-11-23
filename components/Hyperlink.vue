<template>
  <div v-editable="blok" class="hyperlink">
    <!-- prettier-ignore -->
    <a
      v-if="blok.hyperlink"
      :href="blok.hyperlink"
      target="_blank"
      class="cursorInteract"
      >{{ blok.hyperlink_text }}
      <!-- <div
        v-if="blok.hyperlink"
        v-html="require('~/assets/images/icon-hyperlink.svg?include')"
      /> -->
    </a>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>

<style lang="sass">
@import '~/assets/styles/variables.sass'

.hyperlink
  margin-bottom: .5rem
  opacity: $opacity-links
  transition: opacity $hover-nav
  &:hover
    @media (hover: hover)
      opacity: 1
</style>
