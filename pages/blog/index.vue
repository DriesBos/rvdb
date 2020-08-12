<template>
  <section class="view view-Blog">
    <blok-anchor-nav :input="anchorList" />
    <div class="view-NavPlaceholder">
      <div></div>
    </div>
    <div class="view-Content view-Blog_ContentContainer">
      <!-- prettier-ignore -->
      <div :id="story.content.title" class="articles-List blok">
        <h1 v-if="story.content.title" class="blok-Title">{{ story.content.title }}</h1>
        <markdown-item v-if="story.content.text" class="blok-Text" :input="story.content.text" />
        <ul class="article-Link_Container">
          <nuxt-link v-for="item in postList" :key="item.id" :to="`/blog/${item.id}`" tag="li">
            <p class="cursorInteract article-Link">{{ item.title }}</p>
            <div v-if="item.image" class="backgroundImage expandable-Item_Image">
              <div class="backgroundImage-Container">
                <img :src="item.image" :alt="item.image_caption" />
              </div>
            </div>
          </nuxt-link>
        </ul>
      </div>
      <component
        :is="story.content.component | dashify"
        v-if="story.content.component"
        :key="story.content._uid"
        :blok="story.content"
      />
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
    console.log(this.story.content.component, "BLOG PAGE")
  },
  methods: {
    filterPosts() {
      let array = this.posts
      let filteredArray = array.slice(1)
      this.postList = filteredArray
    },
    sortAnchorList() {
      let array = this.story.content.body.map(el => el.title)
      this.anchorList = array
      let arrayTwo = this.story.content.title
      this.anchorList.unshift(arrayTwo)
    }
  }
}
</script>

<style lang="sass">
.article-Link_Container
  li
    margin-bottom: .5rem
    &:last-child
      margin-bottom: 0
  .article-Link:hover ~ .expandable-Item_Image
    opacity: 1
</style>
