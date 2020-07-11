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
  props: {
    input: Array
  },
  mounted() {
    console.log("ANCHOR", this.input, typeof this.input)
  },
  methods: {
    scrollMeTo(refName) {
      // console.log("REF NAME", refName)
      var element = document.getElementById(refName)
      // console.log("EL", element)
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
