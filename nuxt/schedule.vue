<template>
  <div class="schedule-container">
    <div class="schedule">
      <h2 class="title">Schedule</h2>

      <div class="schedule-wrapper">
        <div v-if="!dataNotLoaded">

          <div class="schedule-info">

            <div
              class="json-editor-wrapper"
              v-if="viewJSON || incorrectJSON">
              <v-jsoneditor
                v-model="scheduleText"
                :plus="false"
                :options="{ mode: 'code' }"
                @error="onError"
                height="400px">
              </v-jsoneditor>
            </div>

            <div
              class="scheduler-list"
              v-if="!viewJSON && !incorrectJSON">
              <div
                class="scheduler-item"
                v-for="(item, idx) in scheduleArray"
                :key="idx"
                @click="edit(idx, item)">

                <span class="port">{{item.port}}</span>:
                <span class="value">{{item.on}}</span> - <span class="value">{{item.off}}</span>
                <span class="delete" @click.prevent.stop="remove(idx)">X</span>
              </div>

              <hr/>


              <div class="schedule-controls">

                <div class="channel">
                  <label for="">Channel:</label>
                  <select v-model="newPort">
                    <option v-for="(item, idx) in ports" :key="idx">{{item.name}}</option>
                  </select>   
                </div>

                <div class="timer-on">
                  <label for="On">Time on:</label>
                  <input name="On" type="time" v-model="newOn" :disabled="!newPort">
                </div>

                <div class="timer-off">
                  <label for="Off">Time off:</label>
                  <input name="Off" type="time" v-model="newOff" :disabled="!newPort">
                </div>

              </div>

              <button
                class="add"
                @click="add"
                :disabled="!newPort || !newOn || !newOff">
                  Add
              </button>

              <hr/>


            </div>

          </div>



          
          <button
            :disabled="incorrectJSON"
            @click="viewJSON=!viewJSON">
              {{`${viewJSON ? 'Hide' : 'View'} JSON editor`}}
          </button>

          <button
            :disabled="incorrectJSON"
            @click="applySchedule">
              Apply schedule
          </button>

        </div>

        <div class="no-data" v-if="dataNotLoaded">Data not loaded</div>

      </div>




    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import IconBase from '~/components/IconBase.vue'

export default {
  middleware: 'auth',

  data() {
    return {
      newOn: null,
      newOff: null,
      newPort: null,
      viewJSON: false,
      incorrectJSON: false
    }
  },

  async fetch({ store }) {
    return store.dispatch('schedule/loadSchedule')
  },

  mounted() {
    this.socket = this.$nuxtSocket({})
  },

  computed: {
    ...mapState('schedule', [
      'dataNotLoaded',
      'scheduleArray'
    ]),
    ...mapGetters('schedule', [
      'ports'
    ]),
    scheduleText: {
      get: function() {
        return this.scheduleArray
      },
      set: function(val) {
        this.updateSchedule(val);
        this.incorrectJSON = false;
      }
    }
  },

  methods: {
    ...mapMutations('schedule', [
      'updateSchedule',
      'addSchedule',
      'removeSchedule',
    ]),
    ...mapActions('schedule', [
      'setSchedule',
      'loadSchedule'
    ]),
    clearLocalState() {
      this.newOn = null;
      this.newOff = null;
      this.newPort = null;
    },
    async applySchedule() {
      this.setSchedule(this.scheduleArray);
    },
    add() {
      this.addSchedule({
        on: this.newOn,
        off: this.newOff,
        port: this.newPort
      });
      this.clearLocalState();
    },
    remove(idx) {
      this.removeSchedule(idx);
    },
    edit(idx, item) {
      this.newPort = item.port;
      this.newOn = item.on;
      this.newOff = item.off;
    },
    onError(e) {
      console.error(e)
      this.incorrectJSON = true;
    }
  },
  components: {
    IconBase
  }
}
</script>

<style scoped lang="scss">
  .schedule-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    cursor: default;

    button {
      padding: 5px 10px;
      cursor: pointer;
      min-width: 75px;

      &:disabled {
        cursor: not-allowed;
      }
    }

    .schedule {
      background-color: #F4F4F4;
      // width: 23.75rem;
      padding: .875rem 2.5rem;
      box-sizing: border-box;

      .title {
        text-align: center;
      }


      .schedule-wrapper {
        text-align: center;
        margin: 0 5px;

        .schedule-info {


          .json-editor-wrapper {
            height: 400px;

          }

          .scheduler-list {

            .scheduler-item {
              margin: 15px 20px;
              position: relative;

              .delete {
                position: absolute;
                right: 0px;
                cursor: pointer;
              }
            }

          }

        }

        .schedule-controls {
          display: flex;
          flex-direction: row;
          margin-bottom: 10px;
          // align-items: center;
          // justify-content: start;

          .channel,
          .timer-on,
          .timer-off {
            display: flex;
            flex-direction: column;
            margin-right: 5px;
            
            input,
            select {
              width: 5rem;
              box-sizing: border-box;
              height: 1.5rem;
            }
          }

          .timer-wrapper {
            // display: flex;
            // flex-direction: column;

          }

        }

        .no-data {

        }

      }



    }
  }
</style>