<template>
  <div class="view view-Blog">
    <blok-anchor-nav :input="anchorList" />
    <!-- prettier-ignore -->
    <section class="section section-Content calculateWidth view-Content view-Blog_ContentContainer">
      <div :id="story.content.title" class="articles-List blok">
        <h1 v-if="story.content.title" class="blok-Title">{{ story.content.title }}</h1>
        <markdown-item v-if="story.content.text" class="blok-Text" :input="story.content.text" />
        <ul class="article-Link_Container">
          <nuxt-link v-for="item in postList" :key="item.id" :to="`/blog/${item.id}`" tag="li">
            <h2 class="cursorInteract article-Link">{{ item.title }}</h2>
            <div v-if="item.image" class="backgroundImage expandable-Item_Image">
              <div class="backgroundImage-Container setHeight setWidth">
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
    </section>
  </div>
</template>

<script>
import storyblokLivePreview from "@/mixins/storyblokLivePreview"
import MarkdownItem from "@/components/MarkdownItem.vue"
import setElHeight from "@/mixins/setElHeight"
import { mapState } from "vuex"

export default {
  scrollToTop: true,
  components: {
    "markdown-item": MarkdownItem
  },
  mixins: [storyblokLivePreview, setElHeight],
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
@import '~/assets/styles/variables.sass'

.article-Link_Container
  li
    margin-bottom: .5rem
    &:last-child
      margin-bottom: 0
  .article-Link
    opacity: $opacity-links
    transition: opacity $hover-nav
  .article-Link:hover ~ .expandable-Item_Image
    @media ( hover: hover )
      opacity: 1
  .article-Link:hover
    @media (hover: hover)
      opacity: 1
</style>
