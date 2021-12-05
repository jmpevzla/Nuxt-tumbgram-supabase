<template>
  <div>
    <form @submit.prevent="doSignup">
      <div>
        <input type="email"
          placeholder="Email"
          v-model="form.email" />
      </div>

      <div>
        <input type="text"
          placeholder="Full Name"
          v-model="form.fullname" />
      </div>

      <div>
        <input type="text"
          placeholder="Username"
          v-model="form.username" />
      </div>

      <div>
        <input type="password"
          placeholder="Password"
          v-model="form.password" />
      </div>

      <div>
        <button class="btn btn-primary">Sign Up!</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useNuxtApp, reactive } from '#app'

/**
 * @type NuxtApp
 */
const { $supabase } = useNuxtApp()

const form = reactive({
  email: '',
  fullname: '',
  username: '',
  password: ''
})

const doSignup = async () => {

  const { user, session, error } = await $supabase.auth.signUp({
    email: form.email,
    password: form.password
  })

  if (!error) {
    const { data, error: pfError } = await $supabase.from('profiles').insert([
      {
        id: user.id,
        username: form.username,
        fullname: form.fullname
      }
    ])

    console.log(data, pfError)
  }
};
</script>
