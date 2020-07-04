<template>
  <div v-editable="blok" class="hyperlink">
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
  mounted() {
    console.log("HYPERLINK", this.blok)
  }
}
</script>
