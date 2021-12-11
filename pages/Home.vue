<template>
  <div>
    <h1>My Home...</h1>
    <button class="btn btn-primary" @click="goLogin">Do something</button>
  </div>
</template>

<script>
//
  import { useRouter } from '#app'
  export default {
    setup() {
      const router = useRouter()

      const goLogin = () => {
        router.push('/login')
      }

      return {
        goLogin
      }
    }
  }
</script>
