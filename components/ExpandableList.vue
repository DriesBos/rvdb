<template>
  <div :id="blok.title" v-editable="blok" class="expandable-List blok">
    <h1 v-if="blok.title" class="blok-Title">{{ blok.title }}</h1>
    <markdown-item v-if="blok.text" class="blok-Text" :input="blok.text" />
    <component
      :is="blok.component | dashify"
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
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
// .expandable-List
//   .expandable-Item:last-child
//     background: red
//     .expandable-Item_Title, > div
//       margin-bottom: 0 !important
</style>
