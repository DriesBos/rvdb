<template>
  <div class="anchor-Nav anchor-Nav_Fixed">
    <!-- prettier-ignore -->
    <ul class="menu">
      <li v-for="item in input" :key="item.title" class="menu-Item cursorInteract">
        <a @click="scrollMeTo(item.title)">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["input"],
  mounted() {
    this.newScroll()
  },
  methods: {
    scrollMeTo(refName) {
      document.getElementById(refName).scrollIntoView({
        behavior: "smooth"
      })
    },
    newScroll() {
      console.log("INPUT", this.input)
    }
  }
}
</script>
