function getRequestKey(config) {
  return `${config.method}:${config.url}`;
}

export default function ({ $axios, store }) {
  $axios.onRequest((config) => {
    store.commit('progress/STORE_PENDING_REQUEST', getRequestKey(config));
  });

  $axios.onResponse((response) => {
    store.commit(
      'progress/REMOVE_PENDING_REQUEST',
      getRequestKey(response.config),
    );
  });

  $axios.onError((error) => {
    store.commit(
      'progress/REMOVE_PENDING_REQUEST',
      getRequestKey(error.response.config),
    );
  });
}
