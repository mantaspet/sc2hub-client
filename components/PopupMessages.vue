<template>
  <div
    class="
      fixed
      z-20
      p-2
      w-full
      flex
      justify-center
      md:justify-end
      pointer-events-none
    "
    :style="mdAndUp ? 'top: 56px' : 'top: 0'"
  >
    <transition-group name="fade">
      <div
        v-for="message in messages"
        :key="message.key"
        class="
          bg-neutral-1000
          hover:bg-neutral-900
          text-neutral-100
          transition-all
          duration-150
          shadow-md
          mb-4
          relative
          rounded
          cursor-pointer
          pointer-events-auto
        "
        :style="{ width: mdAndUp ? '20rem' : '100%' }"
        @mouseenter="pauseProgress(message)"
        @mouseleave="resumeProgress(message)"
        @click="onMessageClick(message)"
      >
        <div
          :ref="`message-${message.key}-progress-bar`"
          :style="`transition: width ${progressIntervalTickDuration}ms linear; width: 100%`"
          class="absolute h-1 bg-primary-500 rounded-tl w-full"
        ></div>
        <div class="p-4">
          {{ message.text }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import {
  HIDE_POPUP_MESSAGE_EVENT_NAME,
  SHOW_POPUP_MESSAGE_EVENT_NAME,
} from '@/util/popup-messages';
import breakpointMixin from '@/mixins/breakpoint-mixin';
import { mapActions } from 'vuex';

export default {
  name: 'PopupMessages',

  mixins: [breakpointMixin],

  data() {
    return {
      messages: [],
      progressIntervalTickDuration: 100,
    };
  },

  mounted() {
    window.addEventListener(SHOW_POPUP_MESSAGE_EVENT_NAME, this.showMessage);
    window.addEventListener(HIDE_POPUP_MESSAGE_EVENT_NAME, this.hideMessage);
  },

  beforeDestroy() {
    window.removeEventListener(SHOW_POPUP_MESSAGE_EVENT_NAME, this.showMessage);
    window.removeEventListener(HIDE_POPUP_MESSAGE_EVENT_NAME, this.hideMessage);
  },

  methods: {
    ...mapActions('settings', ['toggleSpoilers']),

    async showMessage(event) {
      const message = event.detail;
      for (let i = 0; i < this.messages.length; i++) {
        const m = this.messages[i];
        if (m.key === message.key) {
          this.hideMessage(m.key);
          await this.$nextTick();
          break;
        }
      }
      this.messages.push(message);
      await this.$nextTick();
      const messageProgressBar =
        this.$refs[`message-${message.key}-progress-bar`][0];
      messageProgressBar.style.width = '100%';

      message.updateIntervalId = setInterval(() => {
        if (messageProgressBar && !message.isProgressPaused) {
          // there is a width transition on the progress bar element with a duration set to message timeout
          const currentWidth = +messageProgressBar.style.width.replace('%', '');

          // make sure that the number timeout is divided from is 100 * interval duration otherwise it won't behave correctly
          const newWidth = currentWidth - 10000 / message.timeout;

          messageProgressBar.style.width = `${newWidth}%`;
          if (newWidth <= 0) {
            this.hideMessage(message.key);
          }
        }
      }, this.progressIntervalTickDuration);
    },

    hideMessage(event) {
      const key = event?.detail?.key || event; // .detail.key when it's received from a custom event (check mounted hook)
      for (let i = 0; i < this.messages.length; i++) {
        const message = this.messages[i];
        if (message.key === key) {
          clearInterval(message.updateIntervalId);
          this.messages.splice(i, 1);
          return;
        }
      }
    },

    pauseProgress(message) {
      message.isProgressPaused = true;
    },

    resumeProgress(message) {
      message.isProgressPaused = false;
    },

    onMessageClick(message) {
      this.hideMessage(message.key);
      if (message.key === 'spoilers-are-enabled-by-default') {
        this.toggleSpoilers(false);
      }
    },
  },
};
</script>
