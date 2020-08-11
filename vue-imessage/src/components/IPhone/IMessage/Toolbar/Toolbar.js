import { mapState } from 'vuex';

import Textwriter from './Textwriter/Textwriter.vue'

export default {
  data () {
    return {
    };
  },
  props: {},
  mounted () {},
  methods: {},
  directives: {},
  components: {
    Textwriter
  },
  computed: mapState([
    'elements'
  ])  
};
