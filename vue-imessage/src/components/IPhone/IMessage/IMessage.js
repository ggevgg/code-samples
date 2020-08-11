import { mapState } from 'vuex';
import Navbar from './Navbar/Navbar.vue'
import Messages from './Messages/Messages.vue'
import Toolbar from './Toolbar/Toolbar.vue'
import Keyboard from './Keyboard/Keyboard.vue'

export default {
  data () {
    return {
      frameNumber: 0,
      curTime: 0,
      startTime: 0
    };
  },
  props: {
  },
  mounted () {
    this.frameNumber = 0;
    this.curTime = 0;
    this.startTime = 0;
    this.start();
  },
  methods: {
    start () {
      this.$store.commit('start');
      window.requestAnimationFrame(this.playFrame.bind(this));
    },
  
    stop () {
      this.$store.commit('stop');
    },
  
    playFrame () {
      if (!this.status.playing) {
        return;
      }
  
      const timestamp = + new Date();
  
      if (!this.startTime) {
        this.startTime = timestamp;
      }
  
      let frame = this.iMessageData.events[this.frameNumber];
      
      while (frame && this.curTime + frame.time <= (timestamp - this.startTime) * this.status.speed) {
        this.applyFrame(frame);
        this.curTime += frame.time;
        frame = this.iMessageData.events[++this.frameNumber];
      }
  
      if (frame) {
        window.requestAnimationFrame(this.playFrame.bind(this));
      }
    },
  
    applyFrame (frame) {
      if (frame.event === 'messageWriter') {
        if (frame.type === 'write') {
          this.$store.commit('messageWriter', frame);
        } else {
          this.$store.commit('clearWriter');
        }
      } else
      if (frame.event === 'message') {
        this.$store.commit('messageAdd', frame);
      } else 
      if (frame.event === 'status') {
        this.$store.commit('statusAdd', frame);
      } else
      if (frame.event === 'waiting') {
        if (frame.type === 'add') {
          this.$store.commit('waitingAdd', frame);
        } else {
          this.$store.commit('waitingRemove', frame);
        }
      }
    }
  },
  directives: {},
  components: {
    Navbar,
    Messages,
    Toolbar,
    Keyboard
  },
  computed: mapState([
    'iMessageData',
    'elements',
    'status'
  ])  
};
