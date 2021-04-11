import screenSizes from '../util/screen-sizes';

const breakpointMixin = {
  data() {
    return {
      mdAndUp: false,
      isClientMounted: false,
    };
  },

  mounted() {
    this.setBreakpoints();
    this.isClientMounted = true;
    window.addEventListener('resize', this.setBreakpoints);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.setBreakpoints);
  },

  methods: {
    setBreakpoints() {
      const width = window.innerWidth;
      this.mdAndUp = width > screenSizes.md;
    },
  },
};

export default breakpointMixin;
