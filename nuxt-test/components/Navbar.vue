<template>
  <nav class="navbar" v-if="isAuthenticated">
    <div class="container">
      <div class="logo">Q</div>
      <div class="navbar-menu">
        <nuxt-link class="navbar-item" to="/">Projects</nuxt-link>
        <a class="navbar-item" @click="logout">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
  async logout() {
    await this.$auth.logout();
    this.$router.push('/login')
  },
},
}
</script>

<style scoped>
  .navbar {
    padding: 1rem 2rem .75rem 2rem;
    position: fixed;
    width: 100%;
    z-index: 100;
    background-color: #FAFAFA;
    border-bottom: 2px solid #9C9C9C;
    box-sizing: border-box;
  }
  .container {
    display: flex;
  }
  .logo {
    font-size: 2rem;
    font-weight: 700;
  }
  .navbar-menu {
    margin-left: auto;
    display: flex;
    align-items: center;
  }
  .navbar-item {
    font-size: .875rem;
    text-transform: uppercase;
    margin-right: 2rem;
    color: #63756D;
    cursor: pointer;
    text-decoration: none;
  }
</style>
