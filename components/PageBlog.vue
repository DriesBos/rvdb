<template>
  <div v-editable="blok" class="pageBlog">
    <component
      :is="blok.component | dashify"
      v-for="blok in blok.body"
      :key="blok._uid"
      :blok="blok"
    ></component>
    <div class="articles-List blok">
      <!-- <h1 v-if="blok.title" class="blok-Title">{{ blok.title }}</h1>
      <markdown-item v-if="blok.text" class="blok-Text" :input="blok.text" />-->
      <!-- <component
        :is="blok.component | dashify"
        v-for="blok in blok.body"
        :key="blok._uid"
        :blok="blok"
      ></component>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blok: Object
  }
}
</script>
