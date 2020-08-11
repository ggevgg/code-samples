import { mapState } from 'vuex';
import Waiting from './Waiting/Waiting.vue'

export default {
  data () {
    return {
    };
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    idx: {
      type: Number,
      required: true
    },
    last: {
      type: Boolean,
      required: true
    }
  },
  mounted () {},
  methods: {},
  directives: {},
  components: {
    Waiting
  },
  computed: {
    ...mapState([
      'iMessageData'
    ]),
    classes () {
      return {
        last: this.last,
        [this.message.type]: true,
        message: this.message.val,
        img: !!this.message.img,
        status: !!this.message.status
      }
    },
    getExternalStyles () {
      return `font-size:${this.iMessageData.styles.messagesFontSize}px;`;
    }

  }
};
