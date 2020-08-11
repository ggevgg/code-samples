<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Edit project name</h2>
      <div class="content">

        <ValidationObserver v-slot="{ handleSubmit }">
          <p class="input-invalid-message" v-if="error">
            {{ error }}
          </p>
          <form method="post" @submit.prevent="handleSubmit(save)">
            <ValidationProvider
              v-slot="{ errors }"
              name="Name"
              rules="required">
              
              <div class="field">
                <input
                  type="text"
                  class="input"
                  name="name"
                  placeholder="Project name"
                  v-model="project.name"
                >
                <span class="input-invalid-message">
                  {{ errors[0] }}
                </span>
              </div>
            </ValidationProvider>
            <div class="control">
              <button type="submit" class="button">Save</button>
            </div>
          </form>
        </ValidationObserver>

      </div>
    </div>
  </section>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { PROJECT_INFO_URL, PROJECT_UPDATE_URL } from '~/assets/consts';
import { PROJECT_NOT_FOUND, PROJECT_NOT_SPECIFIED } from '~/assets/consts/errors';

export default {
  middleware: 'auth',
  components: {
    ValidationObserver: ValidationObserver,
    ValidationProvider: ValidationProvider
  },
  data() {
    return {
      error: null,
    }
  },
  asyncData({query, route, $axios, error}) {
    const {id} = query;
    if (!id) {
      error({ statusCode: 400, message: PROJECT_NOT_SPECIFIED })
    }
    return $axios.get(`${PROJECT_INFO_URL}/${id}`)
      .then(({data}) => ({ project: data.project }))
      .catch((e) => error({ statusCode: 404, message: PROJECT_NOT_FOUND }))
  },
  methods: {
    async save() {
      try {
        this.$nuxt.$loading.start()
        const formdata = new FormData()
        formdata.append('name', this.project.name)
        const url = `${PROJECT_UPDATE_URL}?id=${this.project.id}`
        await this.$axios.post(url, formdata)
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
  .container {
    background-color: #F4F4F4;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .75rem;
    padding-top: 4.875rem;
    min-height: calc(100vh - 5.75rem);
  }
  .input {
    width: 16rem;
  }
  .control {
    text-align: center;
  }
</style>