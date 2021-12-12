<template>
  <div>
    <h1>Home...</h1>
    <button class="btn btn-primary" @click="goLogin">Do something</button>
  </div>
</template>

<script>
//
  import { useRouter, useNuxtApp } from '#app'
  import { setCookie } from '~~/utils'

  export default {
    setup() {
      /**
       * @type NuxtApp
       */
      const { $supabase } = useNuxtApp()
      const router = useRouter()

      const goLogin = () => {
        router.push('/login')
      }

      $supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          setCookie('tumbgram', {
            token: session.access_token
          })

          const data = $supabase.auth.user().user_metadata
          if (Object.keys(data).length > 0) {

            const { error: pfError } = await $supabase
              .from('profiles')
              .insert([
                {
                  id: session.user.id,
                  username: data.username,
                  fullname: data.fullname,
                },
              ])
            if (!pfError) {
              await $supabase.auth.update({
                data: {
                  username: null,
                  fullname: null
                }
              })
            }
          }
        }
      })

      return {
        goLogin
      }
    }
  }
</script>
