<template>
  <section class="view view-Blog">
    <blok-anchor-nav :input="anchorList" />
    <div class="view-NavPlaceholder">
      <div></div>
    </div>
    <div class="view-Content view-Blog_ContentContainer">
      <component
        :is="story.content.component | dashify"
        v-if="story.content.component"
        :key="story.content._uid"
        :blok="story.content"
      />
      <!-- prettier-ignore -->
      <div :id="story.content._uid" class="articles-List blok">
        <h1 v-if="story.content.title" class="blok-Title">{{ story.content.subtitle }}</h1>
        <markdown-item v-if="story.content.text" class="blok-Text" :input="story.content.text" />
        <ul>
          <nuxt-link v-for="item in postList" :key="item.id" :to="`/blog/${item.id}`">
            <p class="cursorInteract">{{ item.title }}</p>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import MarkdownItem from "@/components/MarkdownItem.vue"
import { mapState } from "vuex"

export default {
  scrollToTop: true,
  components: {
    "markdown-item": MarkdownItem
  },
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
      anchorList: [],
      postList: {}
    }
  },
  computed: {
    ...mapState({
      posts: state => state.posts.list
    })
  },
  mounted() {
    this.filterPosts()
    this.sortAnchorList()
    console.log("CONTENT", this.story.content.component)
  },
  methods: {
    filterPosts() {
      let array = this.posts
      let filteredArray = array.slice(1)
      this.postList = filteredArray
    },
    sortAnchorList() {
      let arrayOne = this.story.content.body.filter(function(el) {
        return el.title !== ""
      })
      let arrayTwo = this.story.content
      this.anchorList = arrayOne
      this.anchorList.push(arrayTwo)
    }
  }
}
</script>
