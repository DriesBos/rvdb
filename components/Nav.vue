<template>
  <header>
    <section class="menu-Landing">
      <ul class="menu">
        <!-- prettier-ignore -->
        <li class="menu-Item">
          <nuxt-link to="/" class="cursorInteract">Rutger van den Berg</nuxt-link>
        </li>
      </ul>
    </section>
    <section>
      <!-- prettier-ignore -->
      <ul class="menu">
        <li class="menu-Item">
          <nuxt-link to="/profiel" class="cursorInteract">Profiel</nuxt-link>
        </li>
        <li class="menu-Item">
          <nuxt-link to="/werk" class="cursorInteract">Werk</nuxt-link>
        </li>
        <li class="menu-Item">
          <nuxt-link to="/blog" class="cursorInteract">Blog</nuxt-link>
        </li>
      </ul>
    </section>
  </header>
</template>

<style lang="sass">
@import '~/assets/styles/variables.sass'

header
  display: flex
  &.nav-Fixed
    position: fixed
    top: 0
    left: 0
  &.nav-Normal
    a
      visibility: hidden
  .menu
    padding: 2rem
    padding-top: 3rem
</style>
