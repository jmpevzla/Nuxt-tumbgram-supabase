<template>
  <div class="min-h-screen flex justify-center items-center md:py-3">
    <div class="w-full card bordered md:w-80">
      <div class="card-body border-2 bg-gray-50 rounded-lg px-2">
        <h1 class="card-title text-center text-2xl text-indigo-900 select-none">
          Your Profile!
        </h1>

        <form @submit.prevent="updateProfile" @reset.prevent="resetProfile">
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
            <p class="text-center select-none">
              This disable your account and your posts will isn't available!
            </p>
            <button type="button" class="btn btn-warning">Disable your Account!</button>
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
const { reactive, useNuxtApp, onMounted, ref } = require('#app')

/**
 * @type NuxtApp
 */
const { $supabase } = useNuxtApp()

const form = reactive({
  fullname: '',
  website: '',
  bio: '',
  gender_id: 1
})

const genders = ref([])

const updateProfile = async () => {
  console.log({...form})
}

onMounted(async () => {
  const { data, error } = await $supabase.from('genders').select('*')
  if (!error) {
    genders.value = data
  }
})

</script>
