<template>
  <div class="card" @click="gotoEditProjectPage">
    <div class="container">
      <div class="logo">
        <img :src="project.logo_url">
      </div>
      <div class="name">{{project.name}}</div>
      <div
        class="status"
        :class="isActive(project.is_active)">
        {{isActive(project.is_active)}}
      </div>
      <div class="info-container">
        <div class="info-row">
          <span class="info-title">time this week</span>
          <span class="info-value">{{formatTime(project.spent_time_week)}}</span>
        </div>
        <div class="info-row">
          <span class="info-title">this month</span>
          <span class="info-value">{{formatTime(project.spent_time_month)}}</span>
        </div>
        <div class="info-row">
          <span class="info-title">total</span>
          <span class="info-value">{{formatTime(project.spent_time_all)}}</span>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>

export default {
  computed: {
  },
  methods: {
    formatTime(seconds) {
      return new Date(1000 * seconds).toISOString().substr(11, 8)
    },
    isActive(val) {
      return val ? 'active' : 'inactive'
    },
    gotoEditProjectPage() {
      this.$router.push({
        path: 'edit-project',
        query: {
          id: this.project.id
        }
      });
    }
  },
  props: [
    'project'
  ]
}
</script>

<style scoped>
  .card {
    width: 43.75rem;
    background-color: #fff;
    margin: .375rem 0 .1875rem 0;
    border: 1px solid #EDEDED;
    border-radius: .3125rem;
    cursor: pointer;
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .25rem 1.75rem 1rem 1.75rem;
  }
  .logo {
    width: 3.75rem;
    height: 3.75rem;
    flex-basis: 3.75rem;
    flex-shrink: 0;
    margin-right: 1.375rem;
  }
  .logo img {
    max-width: 100%;
    max-height: 100%;
  }
  .name {
    flex-basis: 11.75rem;
    flex-shrink: 0;
    margin-right: 1.375rem;
    padding-top: .5rem;
    font-weight: 700;
  }
  .status {
    flex-basis: 8.375rem;
    flex-shrink: 0;
    margin-right: 1.375rem;
    font-size: 1.125rem;
    text-transform: capitalize;
  }
  .status.active {
    color: #217E39;
  }
  .status.inactive {
    color: red;
  }
  .info-container {
    flex-basis: 12.25rem;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 1.25rem;
  }
  .info-row {
    margin: .1875rem 0;
    display: flex;
    flex-direction: row;
  }
  .info-value {
    margin-left: auto;
  }
  @media (max-width: 736px) {
    .card {
      width: 100%;
    }
    .container {
      flex-direction: column;    
    }
    .name,
    .status,
    .info-container {
      flex-basis: 1rem;
    }
    .info-title {
      margin-right: 3rem;
    }
  }

</style>
