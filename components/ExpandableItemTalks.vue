<template>
  <div class="expandable-Item-Talks">
    <h1>{{ blok.title }}</h1>
    <h4>{{ blok.type }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>

<style lang="sass">
.expandable-Item-Talks
  h1, h4
    display: inline
</style>
