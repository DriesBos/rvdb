<template>
  <section class="view view-Blog">
    <blok-anchor-nav :input="anchorList" />
    <div class="view-NavPlaceholder">
      <div></div>
    </div>
    <component
      :is="story.content.component | dashify"
      v-if="story.content.component"
      :key="story.content._uid"
      :blok="story.content"
      class="view-Content"
    />
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"

export default {
  mixins: [storyblokLivePreview],
  asyncData(context) {
    let version =
      context.query._storyblok || context.isDev ? "draft" : "published"
    return context.app.$storyapi
      .get("cdn/stories/blog", {
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
      anchorList: {}
    }
  },
  mounted() {
    console.log("BLOG", this.story.content.body)
    this.sortAnchorList()
  },
  methods: {
    sortAnchorList() {
      let array = this.story.content.body
      // console.log("Array", array)
      let filteredList = array.filter(function(el) {
        if (el.title !== "") {
          return true
        }
      })
      console.log("Filtered list", filteredList)
      this.anchorList = filteredList
    },
    scrollMeTo(refName) {
      console.log("REF NAME", refName)
      var element = document.getElementById(refName)
      console.log("EL", element)
      element.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start"
      })
    }
  }
}
</script>
