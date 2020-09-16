<template>
  <div v-editable="blok" class="colofon">
    <!-- prettier-ignore -->
    <p class="cursorInteract">{{ blok.text }}</p>
    <a
      v-if="blok.hyperlink"
      :href="blok.hyperlink"
      target="_blank"
      class="icontag cursorInteract"
      tag="div"
    >
      <div
        v-if="blok.hyperlink"
        v-html="require('~/assets/images/icon-hyperlink.svg?include')"
      />
    </a>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  },
  mounted() {
    console.log(this.blok)
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
