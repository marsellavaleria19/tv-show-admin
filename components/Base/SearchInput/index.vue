<template>
  <div
    class="relative border-[#E3E7ED] text-[14px] text-[#8D9DB5] w-full h-[38px]"
  >
    <MagnifyingGlassIcon
      class="absolute bottom-[10px] left-[8px] w-[16px] h-[16px] font-[Lato] text-[#BDBDBD]"
    />
    <input
      v-model="textValue"
      text="search"
      :placeholder="placeholder"
      class="rounded-lg pl-[30px] pr-5 font-[Lato] border border-gray-400 w-[250px] placeholder:text-[14px] focus:outline-none text-[14px] text-gray-600 h-[38px]"
    />
  </div>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

// --- PROPS ---
const props = defineProps<{
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const textValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

console.log('di base component',textValue)
</script>

<!-- <template>
  <div class="relative" :class="`${variantLayout}`">
    <MagnifyingGlassIcon
      class="
        absolute
        bottom-[10px]
        left-[8px]
        w-[16px]
        h-[16px]
        font-[Lato]
        text-[#BDBDBD]
      "
    />
    <input
      v-model="value"
      text="search"
      :placeholder="placeholder"
      class="rounded-lg pl-[30px] pr-5 font-[Lato] border border-gray-400 w-[250px] placeholder:text-[14px] focus:outline-none text-[14px] text-gray-600 h-[38px]"
    />
  </div>
</template>

<script>
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
// import { mapGetters } from 'vuex'

export default {
  name: 'SearchInput',
  components: {
    MagnifyingGlassIcon,
  },

  props: {
    variantForm: {
      type: String,
      default: ' border-[#E3E7ED] text-[14px] text-[#8D9DB5] w-full h-[38px]',
    },
    variantLayout: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value: '',
    }
  },
  // computed: {
  //   ...mapGetters(['getReset']),
  // },
  watch: {
    value(newValue) {
      // TODO : if want to reset search
      // this.$store.commit('setReset', false)
      this.value = newValue
      this.$emit('update:modelValue', newValue)
    },
  },
  // TODO : if want to reset search
  // updated() {
  //   if (this.getReset) {
  //     this.value = ''
  //   }
  // },
}
</script> -->
