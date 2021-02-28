<template>
  <div class="flex justify-center">
    <form
      class="bg-white max-w-2xl border rounded-md p-3"
      @submit.prevent="login({ username, password })"
    >
      <p>
        Login for now is exclusively for admins for event category and their
        channel management, so the server knows where to look for videos and
        broadcasts.
      </p>
      <BaseTextField
        v-model="username"
        class="mt-3"
        label="Username"
        placeholder="admin"
      />
      <BaseTextField
        v-model="password"
        class="mt-3"
        label="Password"
        placeholder="********"
        type="password"
      />
      <BaseButton class="mt-5" type="submit" block>Login</BaseButton>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    ...mapActions('auth', ['login']),
  },
};
</script>

<style scoped></style>
