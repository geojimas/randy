<template>
  <div class="animate__animated animate__zoomIn max-w-screen-lg bg-orange-200 shadow-2xl rounded-lg mx-auto text-center py-8 mt-32">
    <h2 class="block font-extrabold text-2xl text-gray-700 drop-shadow-lg mb-8">
      Random Password Generator
    </h2>
    <div class="mx-12 flex justify-between">
      <input
        type="text"
        v-model="generatedPassword"
        class="w-full p-4 text-lg border-gray-200 rounded-lg shadow-sm outline-none" />
      <button
        v-clipboard:copy="generatedPassword"
        v-clipboard:success="onSuccess"
        v-clipboard:error="onError"
        class="rounded-xl border-4 border-white p-4 ml-4 hover:bg-slate-100 active:translate-y-0.5 focus:outline-none focus:ring">
        <CopyIcon />
      </button>
    </div>
    <div class="mt-8 flex justify-evenly">
      <div class="mt-8 flex justify-center">
        <fieldset class="space-y-1">
          <input type="range" class="bg-red-400" v-model="passLength" min="6" max="24" />
          <div class="flex justify-center px-1">
            <h1 class="text-xl font-bold drop-shadow-lg text-gray-700">
              Length: <span class="text-blue-500">{{ passLength }}</span>
            </h1>
          </div>
        </fieldset>
      </div>
      <a
        href="https://github.com/geojimas"
        target="_blank"
        class="flex justify-center items-center text-4xl mt-6 cursor-pointer">
        <Github />
      </a>
      <div class="mt-8 flex justify-evenly">
        <button
          @click="refreshPassword = !refreshPassword"
          class="rounded-xl border-4 border-white p-2 hover:bg-slate-100 active:translate-y-0.5 focus:outline-none focus:ring">
          Regenerate
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import CopyIcon from './icons/CopyIcon.vue'
import { notify } from '@kyvg/vue3-notification'
import Github from './icons/Github.vue'

const passLength = ref(6)
const refreshPassword = ref(false)

const data = reactive([
  {
    id: 0,
    name: 'abcd',
    chars: 'abcdefghjkmnopqrstuvwxyz'
  },
  {
    id: 1,
    name: 'ABCD',
    chars: 'ABCDEFGHJKLMNOPQRSTUVWXYZ'
  },
  {
    id: 2,
    name: '1234',
    chars: '0123456789'
  },
  {
    id: 3,
    name: '@#$%',
    chars: '!$%&?+*#-/'
  }
])

const charset = computed(() => {
  console.info(refreshPassword.value)
  return [...data]
    .map(element => {
      return element.chars
    })
    .join('')
})

const generatedPassword = computed(() => {
  return [...window.crypto.getRandomValues(new Uint32Array(passLength.value))]
    .map(value => charset.value[value % charset.value.length])
    .join('')
})

const onSuccess = () => {
  notify({
    title: 'Copied !',
    text: 'Copied to clipboard !',
    type: 'success',
    duration: 2000,
    speed: 500
  })
}

const onError = () => {
  notify(
    {
      group: 'notify',
      title: 'Error',
      text: "didn't copy :("
    },
    2000
  )
}
</script>
