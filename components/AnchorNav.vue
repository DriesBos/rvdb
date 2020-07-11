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
    input: Object
  }
}
</script>

<style lang="sass" scoped></style>
