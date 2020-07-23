export const state = () => ({
  cacheVersion: ""
})

export const mutations = {
  setCacheVersion(state, version) {
    state.cacheVersion = version
  }
}

export const actions = {
  loadCacheVersion({ commit }) {
    return this.$storyapi.get(`cdn/spaces/me`).then(res => {
      commit("setCacheVersion", res.data.space.version)
    })
  }
}

export default {
  actions: {
    // put asynchronous functions that can call one or more mutation functions
    async nuxtServerInit({ commit }, { app }) {
      let getPosts = await app.$storyapi.get("cdn/stories", {
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        starts_with: "blog/"
      })
      let posts = getPosts.data.stories.map(bp => {
        return {
          id: bp.slug,
          title: bp.content.title,
          text: bp.content.text,
          image: bp.content.image
        }
      })
      commit("posts/update", posts)
    }
  }
}
