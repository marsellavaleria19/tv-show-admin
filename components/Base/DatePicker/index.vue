<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-full justify-start text-left font-normal border border-gray-400',
            !date && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon />
        {{ date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0" align="start">
      <div class="calendar-date">
        <Calendar
          :model-value="date"
          @update:model-value="onSelect"
          :default-placeholder="defaultPlaceholder"
          layout="month-and-year"
          initial-focus
          class="bg-white w-full"
        />
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
  import type { DateValue } from "@internationalized/date";
  import {
    DateFormatter,
    getLocalTimeZone,
    today,
    parseDate,
  } from "@internationalized/date";
  import { CalendarIcon } from "lucide-vue-next";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import { Calendar } from "@/components/ui/calendar";
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";

  const props = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
  }>();

  const open = ref(false);
  const defaultPlaceholder = today(getLocalTimeZone());
  const date = ref<DateValue | null>(
    props.modelValue ? parseDate(props.modelValue) : null
  );

  watch(
    () => props.modelValue,
    (val) => {
      date.value = val ? parseDate(val) : null;
    }
  );

  /* ===== FORMAT DISPLAY ===== */
  const df = new DateFormatter("id-ID", {
    dateStyle: "long",
  });

  /* ===== SAAT PILIH TANGGAL ===== */
  function onSelect(val: DateValue | null) {
    date.value = val;
    emit("update:modelValue", val ? val.toString() : "");
    open.value = false
  }
</script>
