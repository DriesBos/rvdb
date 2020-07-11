<template>
  <div :id="blok._uid" v-editable="blok" class="text blok">
    <h1 v-if="blok.title">{{ blok.title }}</h1>
    <markdown-item :input="blok.text" />
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
    // console.log("TEXT", this.blok)
  }
}
</script>

<style lang="sass" scoped>
.text
  h1
    color: black
    margin-bottom: 1.5em
</style>
