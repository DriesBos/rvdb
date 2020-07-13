<template>
  <div class="anchor-Nav anchor-Nav_Fixed">
    <!-- prettier-ignore -->
    <ul class="menu">
      <li v-for="item in input" :key="item._uid" class="menu-Item">
        <a class="cursorInteract" @click="scrollMeTo(item._uid)">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["input"],
  mounted() {
    console.log("ANCHOR INPUT", this.input, typeof this.input)
  },
  methods: {
    scrollMeTo(refName) {
      var element = document.getElementById(refName)
      element.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start"
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
