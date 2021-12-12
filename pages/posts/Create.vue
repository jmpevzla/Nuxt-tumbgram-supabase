<template>
  <div class="min-h-screen flex justify-center items-center md:py-3">
    <div class="w-full card bordered md:w-80">
      <div class="card-body border-2 bg-gray-50 rounded-lg px-2">
        <h1 class="card-title text-center text-2xl text-indigo-900 select-none">
          Create a Post!
        </h1>

        <form @submit.prevent="createPost">
          <div class="flex justify-center">
            <image-post />
          </div>

          <div class="form-control m-3">
            <textarea
              placeholder="What's new..."
              class="textarea textarea-primary textarea-bordered"
              v-model="form.content"
            ></textarea>
          </div>

          <div class="justify-center card-actions">
            <button type="submit" class="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useNuxtApp, reactive, useRouter } from '#app'
import ImagePost from '~/components/ImagePost.vue'

export default {
  middleware: ['auth'],
  setup() {
    /**
     * @type NuxtApp
     */
    const { $supabase } = useNuxtApp()
    const router = useRouter()
    const user = $supabase.auth.user()

    const form = reactive({
      content: ''
    })

    const createPost = async () => {
      const { error } = await $supabase.from('posts').insert({
        user_id: user.id,
        image_url: '',
        content: form.content,
        created_at: new Date(),
        updated_at: new Date()
      })

      if (!error) {
        router.push('/')
      } else {
        alert(error.message)
      }
    }

    return {
      form,
      createPost
    }
  }
}
</script>
