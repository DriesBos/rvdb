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

<style lang="sass" scoped>
.expandable-List:hover
  > .backgroundImage
    @media ( hover: hover )
      opacity: 1
      z-index: -2
</style>
