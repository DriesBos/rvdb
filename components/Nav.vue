<template>
  <header>
    <section class="menu-Landing">
      <ul class="menu">
        <!-- prettier-ignore -->
        <li class="menu-Item">
          <nuxt-link class="cursorInteract" to="/">Rutger van den Berg</nuxt-link>
        </li>
      </ul>
    </section>
    <section>
      <!-- prettier-ignore -->
      <ul class="menu">
        <li class="menu-Item">
          <nuxt-link class="cursorInteract" to="/profiel">Profiel</nuxt-link>
        </li>
        <li class="menu-Item">
          <nuxt-link class="cursorInteract" to="/werk">Werk</nuxt-link>
        </li>
        <li class="menu-Item">
          <nuxt-link class="cursorInteract" to="/blog">Blog</nuxt-link>
        </li>

        <li class="menu-Item">
          <nuxt-link class="cursorInteract" to="/contact">Contact</nuxt-link>
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
