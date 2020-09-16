<template>
  <div :id="blok.body[0].title" v-editable="blok" class="pageBlog">
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
    // console.log("BLOKt", this.blok.body)
  }
}
</script>
