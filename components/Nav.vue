<template>
  <header class="header">
    <section class="section section-Logo">
      <ul class="menu">
        <!-- prettier-ignore -->
        <li class="menu-Item">
          <nuxt-link class="cursorInteract" to="/">Rutger van den Berg</nuxt-link>
        </li>
      </ul>
    </section>
    <section class="section section-Nav">
      <!-- prettier-ignore -->
      <ul class="menu calculateHeight" >
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
