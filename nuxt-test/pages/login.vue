<template>
  <div class="login-container">
    <div class="login">
      <h2 class="title">Login</h2>

      <ValidationObserver v-slot="{ handleSubmit }">
        <p class="input-invalid-message" v-if="error">
          {{ error }}
        </p>
        <form method="post" @submit.prevent="handleSubmit(login)">
          <ValidationProvider
            v-slot="{ errors }"
            name="Email"
            rules="required|email">
            
            <div class="field">
              <input
                type="email"
                class="input"
                name="email"
                placeholder="Email"
                v-model="email"
              >
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            v-slot="{ errors }"
            name="Password"
            rules="required|min:6|max:32">

            <div class="field">
              <input
                type="password"
                class="input"
                name="password"
                placeholder="Password"
                v-model="password"
              >
              <span class="input-invalid-message">
                {{ errors[0] }}
              </span>
            </div>
           </ValidationProvider>

          <div class="control">
            <button type="submit" class="button">Login</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  middleware: 'guest',
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },

  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
        this.$nuxt.$loading.start()
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.statusText
      } finally {
        this.$nuxt.$loading.finish()
      }
    }
  }
}
</script>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  .login {
    background-color: #F4F4F4;
    width: 23.75rem;
    padding: .875rem 2rem .875rem 3.25rem;
    box-sizing: border-box;
  }
</style>