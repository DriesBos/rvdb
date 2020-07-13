<template>
  <section class="view view-Article">
    <!-- prettier-ignore -->
    <div :id="story.content._uid" v-editable="story.content" class="view-Content">
      <h1 v-if="story.content.title" class="article-Title">{{ story.content.title }}</h1>
      <markdown-item :input="story.content.text" />
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import MarkdownItem from "@/components/MarkdownItem.vue"

export default {
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
    console.log("Article", this.story.content)
  }
}
</script>

<style lang="sass" scoped>
.view-Article
  // background: purple
  // z-index: 999
</style>
