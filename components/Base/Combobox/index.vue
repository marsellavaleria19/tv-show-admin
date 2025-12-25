<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-full justify-between text-gray-600 font-lato font-normal"
      >
        {{
          modelValue
            ? listData.find((data) => data.value === modelValue)
                ?.label
            : props.placeholder
        }}
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full p-0">
      <Command class="w-full">
        <CommandInput placeholder="Search framework..." />
        <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup class="bg-white w-full">
            <CommandItem
              v-for="data in props.listData"
              :key="data.value"
              :value="data.value"
              @select="selectValue(data)"
            >
              <CheckIcon
                :class="
                  cn(
                    'mr-2 h-4 w-4',
                    modelValue === data.value ? 'opacity-100' : 'opacity-0'
                  )
                "
              />
              {{ data.label }}
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { CheckIcon, ChevronDown } from "lucide-vue-next";
import { computed, ref } from "vue";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const props = defineProps<{
  modelValue: string;
  listData:{ label: string; value: string | number }[]
  placeholder:string
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const open = ref(false);

const selectValue = (data: any) => {
  emit(
    "update:modelValue",
    props.modelValue === data.value ? "" : data.value
  );
  open.value = false;
};
</script>

<style scoped>
  :deep([data-slot="command-input-wrapper"]){
    background-color: white;
  }
</style>