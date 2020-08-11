import { mapState } from 'vuex';
import Message from './Message/Message.vue'

export default {
  data () {
    return {
    };
  },
  props: {},
  mounted () {},
  methods: {
    detectLast (msg, prevMsg) {
      if (!prevMsg) {
        return true;
      }
      return msg.type !== prevMsg.type;
    }
  },
  directives: {},
  components: {
    Message
  },
  computed: mapState([
    'elements',
    'messages'
  ]),
  updated () {
    this.$refs.messagesWrapper.scrollTop = this.$refs.messagesWrapper.scrollHeight;
  }
};
