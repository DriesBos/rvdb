<template>
  <div v-editable="blok" class="colofon">
    <!-- prettier-ignore -->
    <a
      v-if="blok.hyperlink"
      :href="blok.hyperlink"
      target="_blank"
      class="cursorInteract"
      >{{ blok.text }}
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

.colofon
  display: flex
  align-items: center
  flex-wrap: wrap
  margin-bottom: .5rem
  opacity: $opacity-links
  transition: opacity $hover-nav
  .icontag
    margin-left: .5rem
  &:hover
    @media (hover: hover)
      opacity: 1
</style>
