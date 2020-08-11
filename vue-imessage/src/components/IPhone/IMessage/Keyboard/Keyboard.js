import {
  mapState
} from 'vuex';

import layouts from './Keyboard.consts';

export default {
  data() {
    return {
      layouts
    };
  },
  props: {},
  mounted() {},
  methods: {
    getClass (button) {
      return {
        [button.type]: true,
        [`size${button.size || 0}`]: true,
        active: button.key === this.key || button.code === this.key
      }
    },
    showPopout (button) {
      return this.keyboard.key == button.key && button.popout !== false
    }
  },
  directives: {},
  computed: {
    ...mapState([
      'keyboard'
    ]),
    key () {
      return this.$store.state.keyboard.key
    }
  }
};

