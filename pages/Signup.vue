<template>
  <div class="min-h-screen flex justify-center items-center md:py-2">
    <div class="w-full card bordered md:w-80">
      <div class="card-body border-2 bg-gray-50 rounded-lg px-2 py-4">
        <h1 class="card-title text-center text-2xl text-indigo-900 select-none">
          Sign Up Now!
        </h1>

        <form class="mb-3" @submit.prevent="doSignup">
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
              type="text"
              placeholder="Full Name"
              class="input input-primary input-bordered"
              v-model="form.fullname"
            />
          </div>

          <div class="form-control m-3">
            <input
              type="text"
              placeholder="Username"
              class="input input-primary input-bordered"
              v-model="form.username"
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
            <button class="btn btn-primary">Sign Up!</button>
          </div>
        </form>

        <div class="text-center">
          <nuxt-link class="link link-hover link-primary" to="/login"
            >Login</nuxt-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNuxtApp, reactive, useRouter } from '#app'

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
      fullname: '',
      username: '',
      password: '',
    })

    const doSignup = async () => {
      const { user, session, error } = await $supabase.auth.signUp({
        email: form.email,
        password: form.password,
      }, {
        data: {
          username: form.username,
          fullname: form.fullname
        }
      })

      if (!error) {
        router.push('/login')
      } else {
        alert(error.message)
      }

      //if (!error) {
      //   const { data, error: pfError } = await $supabase
      //     .from('profiles')
      //     .insert([
      //       {
      //         id: user.id,
      //         username: form.username,
      //         fullname: form.fullname,
      //       },
      //     ])

      //   if (!pfError) {
      //     //redirect to login
      //   } else {
      //     alert(pfError.message)
      //   }
      // }
    }

    return {
      form,
      doSignup
    }
  },
}
</script>
