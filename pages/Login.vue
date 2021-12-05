<template>
  <div class="min-h-screen flex justify-center items-center md:py-3">
    <div class="w-full card bordered md:w-80">
      <div class="card-body border-2 bg-gray-50 rounded-lg px-2">
        <h1 class="card-title text-center text-2xl text-indigo-900 select-none">
          Login Now!
        </h1>

        <form @submit.prevent="doLogin">
          <div class="form-control m-3">
            <input
              type="email"
              placeholder="Email"
              class="input input-primary input-bordered"
              v-model="form.email"
            />
          </div>

          <div class="form-control m-3">
            <input
              type="password"
              placeholder="Password"
              class="input input-primary input-bordered"
              v-model="form.password"
            />
          </div>

          <div class="justify-center card-actions">
            <button class="btn btn-primary">Login!</button>
          </div>
        </form>
      </div>
    </div>
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
  password: '',
})

const doLogin = async () => {
  const { user, session, error } = await $supabase.auth.signIn({
    email: form.email,
    password: form.password,
  })

  console.log(user, session, error)

  if (!error) {
    //redirect to home
  }
}
</script>
