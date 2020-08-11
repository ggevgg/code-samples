<template>
  <section class="section">
    <div class="container">
      <div class="date-selector">
        <div class="date-checker" >
          <div
            class="input-group"
            v-for="item in periods"
            :key="item.minutes">
            <input
              type="radio"
              name="date"
              :id="item.minutes"
              :value="item.minutes"
              @change="dateCheckerChangeHandler(item.minutes)"
              :checked="period == item.minutes">
            <label :for="item.minutes">{{item.name}}</label>
          </div>
        </div>
        <div class="date-controls">
          <button id="backButton" @click="decreaseDate">&lt;</button>
          <button id="forwardButton" @click="increaseDate">&gt;</button>
        </div>
      </div>
      <chart
        :data="data"
        v-if="data"
      ></chart>
    </div>
  </section>
</template>

<script>
import Chart from '../components/Chart.vue';
import { mapState, mapActions, mapMutations } from 'vuex'


export default {
  auth: false,
  components: {
    Chart
  },
  data() {
    return {}
  },
  created() {
    this.updateState(this.$route.query);
  },
  mounted() {
    this.loadData();
  },
  computed: {
    ...mapState('chart', [
      'data', 
      'period',
      'periods'
    ])
  },
  methods: {
    ...mapActions('chart', [
      'loadData',
      'increaseDate',
      'decreaseDate',
      'dateCheckerChangeHandler',
    ]),
    ...mapMutations('chart', [
      'updateState'
    ]),
    async fetch({ store }) {
      return store.dispatch('chart/loadData')
    },
  }
}
</script>

<style scoped lang="scss">
  .container {
    background-color: #F4F4F4;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .75rem;
    padding-top: 4.875rem;
    min-height: calc(100vh - 5.75rem);

    .date-selector {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      width: 100%;
      align-items: center;

      .picker {
        display: flex;
      }

      .date-checker {
        display: flex;
        align-items: center;

        .input-group {
          margin-right: .75rem;
          cursor: pointer;
          
          input,
          label {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
