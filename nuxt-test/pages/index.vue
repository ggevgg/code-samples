<template>
  <section class="section">
    <div class="container">
      <div
        v-for="project in projects"
        :key="project.id">
        <card :project="project"></card>
      </div>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'
import { PROJECTS_LIST_URL } from '~/assets/consts';
import { PROJECT_NOT_FOUND } from '~/assets/consts/errors';

export default {
  components: {
    Card
  },
  middleware: 'auth',
  asyncData ({ params, $axios, error }) {
    return $axios.get(PROJECTS_LIST_URL)
      .then(({data}) => ({ projects: data.projects }))
      .catch(e => error({ statusCode: 404, message: PROJECT_NOT_FOUND }))
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
</style>
