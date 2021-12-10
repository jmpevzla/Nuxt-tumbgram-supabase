<template>
  <div class="min-h-screen flex justify-center items-center md:py-3">
    <div class="w-full card bordered md:w-80">
      <div class="card-body border-2 bg-gray-50 rounded-lg px-2">
        <h1 class="card-title text-center text-2xl text-indigo-900 select-none">
          Your Profile!
        </h1>

        <form @submit.prevent="updateProfile" @reset.prevent="resetProfile">

          <div class="flex justify-center">
            <avatar :path.sync="form.avatar" @upload="updateProfile" />
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
              placeholder="Website"
              class="input input-primary input-bordered"
              v-model="form.website"
            />
          </div>

          <div class="form-control m-3">
            <textarea
              placeholder="Bio"
              class="textarea textarea-primary textarea-bordered"
              v-model="form.bio"
            ></textarea>
          </div>

          <div class="form-control m-3">
            <select
              placeholder="Gender"
              class="input input-primary input-bordered"
              v-model="form.gender_id">
              <option v-for="gender of genders" :key="gender.id" :value="gender.id">
                {{ gender.name }}
              </option>
            </select>
          </div>

          <div class="form-control m-3">
            <p class="text-center text-sm select-none mb-2">
              This disable your account and your posts will isn't available!
            </p>
            <button type="button" class="btn btn-warning" @click="disableProfile">
              Disable your Account!
            </button>
          </div>

          <div class="justify-center card-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="reset" class="btn btn-outline">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Avatar from '@/components/Avatar.vue'
import { reactive, useNuxtApp, onMounted, ref } from '#app'

/**
 * @type NuxtApp
 */
const { $supabase } = useNuxtApp()

const form = reactive({
  fullname: '',
  website: '',
  bio: '',
  gender_id: 1,
  avatar: null
})

let backup = null

const genders = ref([])

const updateProfile = async () => {
  try {
    const { data, error } = await $supabase.from('profiles').update({
      id: backup.id,
      fullname: form.fullname,
      website: form.website,
      bio: form.bio,
      gender_id: form.gender_id,
      avatar: form.avatar
    })

    if (error) throw error

    backup = { ...data }

  } catch(error) {
    console.error(error.message)
  }
}

const resetProfile = async () => {
  form.fullname = backup.fullname
  form.website = backup.website
  form.bio = backup.bio
  form.gender_id = backup.gender_id
  form.avatar = backup.avatar
}

const disableProfile = async () => {
  try {
    const { data, error } = await $supabase.from('profiles').update({
      id: backup.id,
      disable: true
    })

    if (error) throw error

  } catch(error) {
    console.error(error.message)
  }
}

onMounted(async () => {
  try {
    const PromGenders = $supabase.from('genders').select('*')
    const PromProfile = $supabase.from('profiles').select('*').single()

    const [gend, prof] = await Promise.all([PromGenders, PromProfile])
    if (gend.error) throw gend.error
    if (prof.error) throw prof.error

    genders.value = gend.data

    backup = { ...prof.data }
    form.fullname = prof.data.fullname
    form.website = prof.data.website
    form.bio = prof.data.bio
    form.gender_id = prof.data.gender_id
    form.avatar = prof.data.avatar
  } catch(error) {
    console.error(error.message)
  }

})

</script>
