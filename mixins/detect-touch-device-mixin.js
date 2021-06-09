const detectTouchDeviceMixin = {
  data() {
    return {
      isUsingTouch: false,
    };
  },

  mounted() {
    window.addEventListener('touchstart', this.setIsUsingTouch);
  },

  beforeDestroy() {
    window.removeEventListener('touchstart', this.setIsUsingTouch);
  },

  methods: {
    setIsUsingTouch() {
      this.isUsingTouch = true;
    },
  },
};

export default detectTouchDeviceMixin;
