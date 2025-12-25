<template>
  <Dialog v-model:open="open">
    <DialogContent class="sm:max-w-[425px] bg-white">
      <Form
        :validation-schema="formSchema"
        :initial-values="formValue"
        @submit="onSubmit"
      >
        <DialogHeader>
          <DialogTitle class="text-[#022B55] font-bold text-xl">
            {{ dataInformation[props.typeForm].title }}
          </DialogTitle>
        </DialogHeader>
        <div class="py-6">
          <div class="mb-3">
            <FormField name="id" v-slot="{ componentField }">
              <FormLabel class="my-2">ID Acara TV</FormLabel>
              <Input
                placeholder="ID TV Show"
                v-bind="componentField"
                class="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <FormMessage />
            </FormField>
          </div>
          <div class="mb-3">
            <FormField name="name" v-slot="{ componentField }">
              <FormLabel class="mb-2">Nama Acara TV</FormLabel>
              <Input
                placeholder="Nama Acara TV"
                v-bind="componentField"
                class="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <FormMessage />
            </FormField>
          </div>
          <div class="mb-3">
            <FormField name="category" v-slot="{ componentField }">
              <FormLabel class="mb-2">Kategori Acara TV</FormLabel>
              <BaseCombobox
                :model-value="componentField.modelValue"
                :list-data="listCategory"
                placeholder="Pilih Kategori"
                @update:model-value="componentField.onChange"
              />
              <FormMessage />
            </FormField>
          </div>
          <div class="mb-3">
            <FormField name="date" v-slot="{ componentField }">
              <FormLabel class="mb-2">Tanggal Tayang</FormLabel>
              <BaseDatePicker
                :model-value="componentField.modelValue"
                @update:model-value="componentField.onChange"
              />
              <FormMessage />
            </FormField>
          </div>
          <div class="mb-3">
            <FormField name="description" v-slot="{ componentField }">
              <FormLabel class="mb-2">Deskripsi Acara TV</FormLabel>
              <Textarea
                placeholder="Deskripsi Acara TV"
                v-bind="componentField"
                class="focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <FormMessage />
            </FormField>
          </div>
        </div>
        <DialogFooter class="bg-gray-50 -mx-6 -mb-6 px-6 py-4 rounded-b-lg">
          <Button
            variant="outline"
            class="border-[#022B55] cursor-pointer hover:bg-gray-300"
            @click="closeDialog"
            >Batal</Button
          >
          <Button class="bg-[#022B55] text-white cursor-pointer hover:bg-gray-500">Submit</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormField, FormLabel, FormMessage } from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useStoreFormTvShow } from "~/store/tv-show";
import { Textarea } from "~/components/ui/textarea";
import { toast } from "vue-sonner";
import { format } from "date-fns";

// --- SCHEMA VEE VALIDATE ---
const formSchema = toTypedSchema(
  z.object({
    id: z.string().min(1, "ID wajib diisi"),
    name: z.string().nonempty("Nama wajib diisi"),
    category: z.string().nonempty("Kategori wajib diisi"),
    date: z.string().nonempty("Tanggal Rilis wajib diisi"),
    description: z.string().nonempty("Deskripsi wajib diisi"),
  })
);

// --- PROPS ---
const props = defineProps<{
  isOpen: boolean;
  dataSelect?: any;
  typeForm: string;
}>();

// --- DATA ---
const dataInformation = ref() as any;
dataInformation.value = {
  createData: {
    title: "Tambah Data Acara TV",
    successInfo: "Data berhasil disimpan",
    failedInfo: "Data gagal disimpan",
  },
  editData: {
    title: "Edit Data Acara Tv",
    successInfo: "Data berhasil diubah",
    failedInfo: "Data gagal diubah",
  },
};
const formValue = ref();
const formRef = ref<any>(null);

// --- STORE ---
const storeFormTvShow = useStoreFormTvShow();

// --- EMIT ---
const emit = defineEmits<{
  (e: "update:isOpen", value: boolean): void;
}>();

// --- COMPUTED ---
const payload = computed(() => {
  return storeFormTvShow.payload;
});

const listCategory = computed(() => {
  return storeFormTvShow.listCategory.map((category) => {
    return { label: category.name, value: category.id.toString() };
  });
});

// const initialValues = computed(() => {
//   if (!props.dataSelect) return {};
//   return {
//     id: props.dataSelect.id_show,
//     name: props.dataSelect.name_show,
//     category: props.dataSelect.categoryId?.toString(),
//     date: props.dataSelect?.premier_at
//       ? format(new Date(props.dataSelect.premier_at), "yyyy-MM-dd")
//       : undefined,
//     description: props.dataSelect.description,
//   };
// });

const open = computed({
  get: () => props.isOpen,
  set: (val) => emit("update:isOpen", val),
});

// --- METHOD ---

const refreshForm = () => {
  formValue.value = {
    id: "",
    name: "",
    category: "",
    date: format(new Date(), "yyyy-MM-dd"),
    description: "",
  };
};

const closeDialog = () => {
  open.value = false;
  refreshForm()
};

const onSubmit = async (values: any) => {
  storeFormTvShow.payload = {
    id_show: values.id,
    name_show: values.name,
    description: values.description,
    premier_at: values.date,
    categoryId: values.category,
  };
  const information = dataInformation.value[props.typeForm];
  const id = toast.loading("loading...");
  try {
    if (props.typeForm === "createData") {
      await storeFormTvShow.createData();
    } else {
      await storeFormTvShow.updateData(props.dataSelect.id);
    }
    toast.success(information.successInfo, { id });
    await storeFormTvShow.getAllDataTvShow();
    open.value = false;
    refreshForm()
  } catch (error) {
    toast.error(information.failedInfo, { id });
  }
};

// --- WATCH ---
watch(
  () => props.dataSelect,
  (val) => {
    if (val) {
      formValue.value = {
        id: val.id_show,
        name: val.name_show,
        category: val.categoryId?.toString() || "",
        date: props.dataSelect?.premier_at
          ? format(new Date(props.dataSelect.premier_at), "yyyy-MM-dd")
          : undefined,
        description: val.description || "",
      };
    } else {
     refreshForm()
    }
  },
  { immediate: true }
);
</script>
