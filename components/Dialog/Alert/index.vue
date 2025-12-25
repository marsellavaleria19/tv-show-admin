<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent class="bg-white">
      <AlertDialogHeader>
        <AlertDialogTitle class="pb-2 font-bold text-[#022B55] text-[20px]">{{
          props.dialog.title
        }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ props.dialog.description }}
          <p class="font-bold mt-1">
            {{ dataSelect?.id_show }} - {{ dataSelect?.name_show }}
          </p>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button variant="outline" class="border-[#022B55]" @click="closeDialog"
          >Batal</Button
        >
        <Button class="bg-[#022B55] text-white" @click="onDelete"
          >Lanjut</Button
        >
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";
import { useStoreFormTvShow } from "~/store/tv-show";

// --- PROPS ---
const props = defineProps<{
  isOpen: boolean;
  dialog: { title: ""; description: "" };
  dataSelect?: any;
}>();

// == COMPUTED ---
const open = computed({
  get: () => props.isOpen,
  set: (val) => emitOpen("update:isOpen", val),
});

// --- EMIT ---
const emitOpen = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

// --- METHOD ---
const closeDialog = () => {
  open.value = false;
};
const onDelete = async () => {
  const id = toast.loading("loading...");
  const storeFormTvShow = useStoreFormTvShow();
  try {
    await storeFormTvShow.deleteData(props.dataSelect?.id);
    toast.success("Data berhasil dihapus", { id });
    await storeFormTvShow.getAllDataTvShow();
    open.value = false;
  } catch (error) {
    toast.error("Data gagal dihapus", { id });
  }
};
</script>
