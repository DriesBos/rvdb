<template>
  <div v-editable="blok" class="title">
    <h1>{{ blok.title }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>

<style lang="sass" scoped>
.title
  h1
    color: black
</style>
