<template>
  <div class="markdown" v-html="compiledMarkdown"></div>
</template>

<script>
// https://marked.js.org/
const marked = require("marked")
const renderer = new marked.Renderer()

marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true
})

renderer.link = function(href, title, text) {
  return (
    '<a target="_blank" href="' +
    href +
    '" title="' +
    title +
    '">' +
    text +
    "</a>"
  )
}

export default {
  name: "MarkdownItem",
  props: {
    input: String
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { renderer: renderer })
    }
  },
  mounted() {
    document
      .querySelectorAll("a")
      .forEach(item => item.addEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll("a")
      .forEach(item =>
        item.addEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  destroyed() {
    document
      .querySelectorAll("a")
      .forEach(item => item.removeEventListener("mouseover", this.changeCursor))
    document
      .querySelectorAll("a")
      .forEach(item =>
        item.removeEventListener("mouseleave", this.removeChangeCursor)
      )
  },
  methods: {
    changeCursor() {
      document.querySelector(".cursor").classList.add("active")
    },
    removeChangeCursor() {
      document.querySelector(".cursor").classList.remove("active")
    }
  }
}
</script>

<style lang="sass">
// Prefer style handling by cascading css (typography.sass) as much as possible.
.markdown
  p
    white-space: pre-line
  a
    cursor: none
    transition: color .16s ease
  a:hover
    color: black
</style>
