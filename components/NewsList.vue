<template>
  <div v-editable="blok" class="news-List">
    <component
      :is="blok.component | dashify"
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  },
  mounted() {
    console.log("NEWS LIST", this.blok)
  }
}
</script>

<style lang="sass" scoped>
.news-List
  margin-bottom: 1.5rem
</style>
