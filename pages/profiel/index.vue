<template>
  <div class="view view-Profiel">
    <blok-anchor-nav :input="anchorList" />
    <component
      :is="story.content.component | dashify"
      v-if="story.content.component"
      id="calculateWidth"
      :key="story.content._uid"
      :blok="story.content"
      class="section section-Content calculateWidth view-Content"
    />
  </div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  scrollToTop: true,
  mixins: [storyblokLivePreview],
  asyncData(context) {
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published"
    return context.app.$storyapi
      .get("cdn/stories/profiel", {
        version: version
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
      story: { content: {} },
      anchorList: []
    }
  },
  mounted() {
    this.sortAnchorList()
  },
  methods: {
    sortAnchorList() {
      let array = this.story.content.body.map(el => el.title)
      this.anchorList = array
    }
  }
}
</script>
