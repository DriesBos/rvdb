<template>
  <div :id="blok.title" v-editable="blok" class="text blok">
    <h1 v-if="blok.title" class="blok-Title">{{ blok.title }}</h1>
    <markdown-item :input="blok.text" />
    <!-- IMAGE -->
    <div v-if="blok.image" class="backgroundImage">
      <div class="backgroundImage-Container">
        <img :src="blok.image" :alt="blok.title" />
      </div>
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
  }
}
</script>

<style lang="sass">
.text
  overflow: hidden
  // img
  //   width: 100%
  //   height: auto
  //   max-width: 100%
  //   margin-top: 1.5rem
  //   margin-bottom: 1.5rem
  &:hover > .backgroundImage
    @media ( hover: hover )
      opacity: 1
      z-index: -2
</style>
