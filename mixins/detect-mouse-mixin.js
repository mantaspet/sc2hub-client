const detectMouseMixin = {
  data() {
    return {
      isUsingMouse: false,
    };
  },

  mounted() {
    window.addEventListener('mousemove', this.setIsUsingMouse);
  },

  beforeDestroy() {
    window.removeEventListener('mousemove', this.setIsUsingMouse);
  },

  methods: {
    setIsUsingMouse() {
      this.isUsingMouse = true;
      window.removeEventListener('mousemove', this.setIsUsingMouse);
    },
  },
};

export default detectMouseMixin;
