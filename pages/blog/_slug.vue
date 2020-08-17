<template>
  <section class="view view-Article">
    <!-- prettier-ignore -->
    <nuxt-link class="article-Close" to="/blog" title="sluit artikel">Sluiten</nuxt-link>
    <!-- prettier-ignore -->
    <div :id="story.content._uid" v-editable="story.content" class="article-Content blok">
      <h1 v-if="story.content.title" class="article-Title">{{ story.content.title }}</h1>
      <markdown-item :input="story.content.text" />
      <div v-if="story.content.body" class="hyperlinks">
        <component
          :is="blok.component | dashify"
          v-for="blok in story.content.body"
          :key="blok._uid"
          :blok="blok"
        ></component>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import MarkdownItem from "@/components/MarkdownItem.vue"

export default {
  scrollToTop: true,
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
  },
  mounted() {
    console.log(this.story.content.body, "ARTICLE")
  }
}
</script>

<style lang="sass">
@import '~/assets/styles/variables.sass'

.article
  &-Close
    position: fixed
    top: 0
    left: 0
    padding: var(--spacing-top) var(--spacing-sides)
    opacity: $opacity-links
    transition: opacity $hover-nav
    @media all and (max-width: $breakpoint-mobile)
      position: relative
      padding-left: 0
    &:hover
      opacity: 1
  &-Content
    max-width: $max-width-article
    img
      max-width: $max-width-article
    .markdown
      p, h1, h2, h3, h4, h5
        margin-bottom: 1.5em
      p:last-child
        margin-bottom: 0
      a
        text-decoration: underline
  &-Title
    margin-bottom: var(--spacing-top)
</style>
