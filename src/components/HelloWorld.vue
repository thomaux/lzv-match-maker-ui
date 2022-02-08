<script setup lang="ts">
import { ref, inject } from "vue";
import { AuthenticationProperties } from "vue-auth0-plugin";

defineProps<{ msg: string }>();

const count = ref(0);
const auth = inject<typeof AuthenticationProperties>("auth");
const audience = 'https://lzv-mm.be';

if (!auth) {
  throw Error('could not inject auth');
}


async function callApi() {
  const accessToken = await auth?.getTokenSilently({ audience });
  const result = await fetch('http://localhost:3000/api/region', {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  });
  const data = await result.json();
  console.log(data);
}

</script>

<template>
  <h1>{{ msg }}</h1>

  <div v-if="!auth.loading">
    <div v-if="auth.authenticated">
      <button type="button" @click="auth.logout()">Logout</button>
      <button type="button" @click="callApi">Test API</button>
    </div>
    <div v-else>
      <button type="button" @click="auth.loginWithRedirect({ audience })">Login</button>
    </div>
  </div>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>
    See
    <code>README.md</code> for more information.
  </p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
