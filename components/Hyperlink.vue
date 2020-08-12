<template>
  <div v-editable="blok" class="hyperlink">
    <!-- prettier-ignore -->
    <p>{{ blok.hyperlink_text }}</p>
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
.hyperlink
  display: flex
  align-items: center
  flex-wrap: wrap
  margin-bottom: .5rem
  .icontag
    margin-left: .5rem
</style>
