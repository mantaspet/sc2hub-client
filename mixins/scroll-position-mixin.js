const scrollPositionMixin = {
  data() {
    return {
      scrollY: 0,
    };
  },

  mounted() {
    window.addEventListener('scroll', this.setScrollPosition);
  },

  beforeDestroy() {
    window.removeEventListener('scroll', this.setScrollPosition);
  },

  methods: {
    setScrollPosition() {
      this.scrollY = window.scrollY;
    },
  },
};

export default scrollPositionMixin;
