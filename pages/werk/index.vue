<template>
  <div class="view view-Werk">
    <blok-anchor-nav :input="anchorList" />
    <component
      :is="story.content.component | dashify"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      class="section section-Content view-Content"
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
      .get("cdn/stories/werk", {
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
      console.log("WERK ANCHORLIST", this.anchorList, typeof this.anchorList)
    }
  }
}
</script>
