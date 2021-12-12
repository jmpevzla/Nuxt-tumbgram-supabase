<template>
  <div class="min-h-screen flex justify-center items-center md:py-3">
    <div class="w-full card bordered md:w-80">
      <div class="card-body border-2 bg-gray-50 rounded-lg px-2 py-4">
        <h1 class="card-title text-center text-2xl text-indigo-900 select-none">
          Login Now!
        </h1>

        <form class="mb-3" @submit.prevent="doLogin">
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

        <div class="text-center">
          <nuxt-link class="link link-hover link-primary" to="/signup"
            >Sign Up</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNuxtApp, reactive, useRouter } from '#app'
import { setCookie } from '@/utils'

export default {
  middleware: ['no-auth'],
  setup() {
    /**
     * @type NuxtApp
     */
    const { $supabase } = useNuxtApp()
    const router = useRouter()

    const form = reactive({
      email: '',
      password: '',
    })

    const doLogin = async () => {
      const { user, session, error } = await $supabase.auth.signIn({
        email: form.email,
        password: form.password,
      })

      if (!error) {
        console.log(user, session, error)

        //document.cookie = `tumbgram.token=${session.access_token}; expires=Thu, 10 Dec 2099 12:00:00 UTC; path=/`;
        setCookie('tumbgram', {
          token: session.access_token,
        })

        //redirect to home
        router.push('/')
      } else {
        form.password = ''
        alert(error.message)
      }
    }

    return {
      form,
      doLogin
    }
  },
}
</script>
