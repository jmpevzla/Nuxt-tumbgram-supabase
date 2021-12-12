<template>
  <div>
    <div id="image" class="mb-2 leading-none relative" @click="openDialog">
      <img
        v-if="src"
        :src="src"
        alt="Avatar"
        class="avatar object-cover"
        :style="{ height, width }"
      />
      <div
        v-else
        class="avatar bg-gray-700 border border-solid border-gray-300"
        :style="{ height, width }"
      />

      <div
        :class="['absolute z-10 top-0 left-0 bg-gray-100 flex justify-center items-center cursor-pointer opacity-50', {'cursor-not-allowed': uploading}]"
        :style="{ height, width }" />

      <div
        :class="['absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none cursor-pointer', {'cursor-not-allowed': uploading}]">
        <p class="font-bold text-center"
          :style="{ width }">{{ uploading ? "Uploading ..." : "Upload" }}</p>
      </div>
    </div>

    <div>
      <input
        class="invisible absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>

<style scoped>
  .avatar {
    @apply rounded overflow-hidden max-w-full;
  }
</style>

<script>
//
//
  import { ref, toRefs, watch, useNuxtApp } from '#app'
  //import { generateQuickGuid } from '@/utils'

  export default {
    // props: {
    //   path: String
    // },
    emits: ['upload', 'update:path'],
    setup(props, { emit }) {

      /**
        * @type NuxtApp
        */
      const { $supabase } = useNuxtApp()

      //const { path } = toRefs(props)
      const width = ref('10em')
      const height = ref('15em')
      const uploading = ref(false)
      const src = ref('')
      //const files = ref()

      // const downloadImage = async () => {
      //   try {
      //     const { data, error } = await $supabase.storage
      //       .from("avatars")
      //       .download(path.value)
      //     if (error) throw error
      //     src.value = URL.createObjectURL(data)
      //   } catch (error) {
      //     console.error("Error downloading image: ", error.message)
      //   }
      // }

      // const uploadAvatar = async (evt) => {
      //   files.value = evt.target.files
      //   try {
      //     uploading.value = true
      //     if (!files.value || files.value.length === 0) {
      //       throw new Error("You must select an image to upload.")
      //     }

      //     const file = files.value[0]
      //     const fileExt = file.name.split(".").pop()
      //     const fileName = `${generateQuickGuid()}.${fileExt}`
      //     const filePath = `${fileName}`

      //     let { error: uploadError } = await $supabase.storage
      //       .from("avatars")
      //       .upload(filePath, file)

      //     if (uploadError) throw uploadError

      //     if (path.value) {
      //       let { error: deleteError } = await $supabase.storage
      //       .from("avatars")
      //       .remove([path.value])
      //     }

      //     emit("update:path", filePath)
      //     emit("upload")
      //   } catch (error) {
      //     alert(error.message)
      //   } finally {
      //     uploading.value = false
      //   }
      // }

      // watch(path, () => {
      //   path.value ? downloadImage() : ""
      // })

      const openDialog = () => {
        if (!uploading.value) {
          const input = document.getElementById('single')
          input.click()
        }
      }

      return {
        uploading,
        src,
        width,
        height,
        //files,
        //uploadAvatar,
        openDialog
      };
    }
  }
</script>
