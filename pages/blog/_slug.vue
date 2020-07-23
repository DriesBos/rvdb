<template>
  <section class="view view-Article">
    <!-- prettier-ignore -->
    <nuxt-link class="article-Close" to="/blog">Close</nuxt-link>
    <!-- prettier-ignore -->
    <div :id="story.content._uid" v-editable="story.content" class="article-Content blok">
      <h1 v-if="story.content.title" class="article-Title">{{ story.content.title }}</h1>
      <markdown-item :input="story.content.text" />
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import MarkdownItem from "@/components/MarkdownItem.vue"

export default {
  scrollToTop: true,
  // transition: {
  //   name: "article",
  //   mode: "out-in"
  // },
  components: {
    "markdown-item": MarkdownItem
  },
  mixins: [storyblokLivePreview],
  asyncData(context) {
    let endpoint = `cdn/stories/blog/${context.params.slug}`
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published"
    return context.app.$storyapi
      .get(endpoint, {
        version: version,
        cv: context.store.state.cacheVersion
      })
      .then(res => {
        return res.data
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
          context.error({
            statusCode: 404,
            message: "Failed to receive content form api"
          })
        } else {
          console.error(res.response.data)
          context.error({
            statusCode: res.response.status,
            message: res.response.data
          })
        }
      })
  },
  data() {
    return {
      story: { content: {} }
    }
  }
}
</script>

<style lang="sass">
.article
  &-Close
    position: fixed
    top: 0
    right: 0
    margin: 3rem 2rem
  &-Content
    max-width: 42rem
    img
      max-width: 42rem
    .markdown
      p, h1, h2, h3, h4, h5
        margin-bottom: 1.5em
      p:last-child
        margin-bottom: 0
  &-Title
    margin-bottom: 3rem
</style>
