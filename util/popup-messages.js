import { v4 as uuidv4 } from 'uuid';
import SCREEN_SIZES from '@/util/screen-sizes';

export const SHOW_POPUP_MESSAGE_EVENT_NAME = 'showSC2HubPopupMessage';
export const HIDE_POPUP_MESSAGE_EVENT_NAME = 'hideSC2HubPopupMessage';

// supports passing via string or a config object
export function showMessage(config) {
  const parsedConfig = {
    key: config.key || uuidv4(),
    timeout: config.timeout || 5000,
    type: config.type || 'default',
    text: typeof config === 'string' ? config : config.text,
  };
  const event = new CustomEvent(SHOW_POPUP_MESSAGE_EVENT_NAME, {
    detail: parsedConfig,
  });
  window.dispatchEvent(event);
}

export function hideMessage(key) {
  const event = new CustomEvent(HIDE_POPUP_MESSAGE_EVENT_NAME, {
    detail: {
      key,
    },
  });
  window.dispatchEvent(event);
}

export function showSpoilerHintMessage() {
  setTimeout(() => {
    // waiting for notifications listener to be registered
    const text =
      window.innerWidth >= SCREEN_SIZES.md
        ? 'Spoilers are disabled by default. You can enable them by pressing on the settings icon above this message.'
        : 'Spoilers are disabled by default. You can enable them in "More" page\'s "Settings" section.';
    showMessage({
      text,
      key: 'spoilers-are-enabled-by-default',
      timeout: 12000,
    });
  });
}
