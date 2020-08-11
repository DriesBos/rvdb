<template>
  <div class="anchor-Nav anchor-Nav_Fixed">
    <!-- prettier-ignore -->
    <scrollactive class="menu my-nav" :offset="0">
      <li v-for="item in input" :key="item.title" class="menu-Item">
        <a :href="'#' + item.title" class="scrollactive-item cursorInteract">{{ item.title }}</a>
      </li>
    </scrollactive>
  </div>
</template>

<script>
export default {
  props: ["input"] // Is an object
}
</script>

<style lang="sass" scoped>
.anchor-Nav
  .menu
    padding-top: 3rem
    padding-left: 2vw
  a
    position: relative
    &.is-active
      opacity: 1
      &::after
        content: ""
        position: absolute
        bottom: -.5rem
        left: 0
        width: 100%
        border-bottom: 2px solid black
  &_Fixed
    position: fixed
    transform: translateZ(0)
</style>
