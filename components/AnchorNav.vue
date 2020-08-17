<template>
  <section class="section section-Anchor">
    <!-- prettier-ignore -->
    <scrollactive class="menu my-nav" :offset="0">
      <li v-for="item in input" :key="item" class="menu-Item">
        <a :href="'#' + item" class="scrollactive-item cursorInteract">{{ item }}</a>
      </li>
    </scrollactive>
  </section>
</template>

<script>
export default {
  props: {
    input: {
      type: Array
    }
  }
}
</script>

<style lang="sass" scoped>
.section-Anchor
  a
    position: relative
    &.is-active
      opacity: 1
      &::after
        content: ""
        position: absolute
        bottom: -.5em
        left: 0
        width: 100%
        border-bottom: 2px solid black
</style>
