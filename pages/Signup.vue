<template>
  <div>
    <form @submit.prevent="doSignup">
      <div>
        <input type="email" placeholder="Email" />
      </div>

      <div>
        <input type="text" placeholder="Full Name" />
      </div>

      <div>
        <input type="text" placeholder="Username" />
      </div>

      <div>
        <input type="password" placeholder="Password" />
      </div>

      <div>
        <button class="btn btn-primary">Sign Up!</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app'

/**
 * @type NuxtApp
 */
const { $supabase } = useNuxtApp()

const doSignup = async () => {

  const { user, session, error } = await $supabase.auth.signUp({
    email: 'j@gmail.com',
    password: 'demo123'
  })

};
</script>
