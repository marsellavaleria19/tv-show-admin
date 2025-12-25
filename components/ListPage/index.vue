<template>
  <PagePanel>
    <div class="flex justify-between">
      <div class="flex items-center">
        <BaseSearchInput
          placeholder="Cari ID atau Nama Film"
          v-model="search"
        />
        <BaseCombobox
          v-model="query.category"
          :list-data="listCategory"
          placeholder="Pilih Kategori"
          class="w-60 ml-2"
        />
        <BaseDatePicker v-model="premierDate" />
      </div>
      <Button
        class="bg-[#022B55] text-white text-[14px] font-bold hover:bg-gray-600 cursor-pointer"
        @click="onCreate"
        >Tambah</Button
      >
    </div>
    <BaseTableData
      :list-header="listHeader"
      :list-data="listDataTv"
      :row-key="rowKey"
      :page-data="pageData"
      @sort="sortingData"
      @current-page="changeCurrentPage"
    >
      <template #action="{ item }">
        <div class="text-center">
          <Button
            v-for="button in buttonAction"
            :key="button.name"
            class="group bg-white rounded-full mr-2 shadow shadow-gray-400 cursor-pointer hover:bg-gray-600"
            @click="chooseAction(item, button.name)"
          >
            <component
              :is="button.icon"
              class="stroke-gray-600 stroke-3 group-hover:stroke-gray-100"
            />
          </Button>
        </div>
      </template>
    </BaseTableData>
  </PagePanel>
  <DialogFormShow
    v-model:is-open="isOpenDialogForm"
    :data-select="dataSelect"
    :type-form="typeForm"
  />
  <DialogAlert
    v-model:is-open="isOpenDialogAlert"
    :dialog="dataDialog"
    :data-select="dataSelect"
  />
</template>

<script setup lang="ts">
import { PencilIcon, EyeIcon, Trash2Icon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { format, formatISO } from "date-fns";
import { useStoreFormTvShow } from "~/store/tv-show";
import { useDebounceFn } from "@vueuse/core";

// --- ROUTER ---
const router = useRouter();

// --- PROPS ---
interface Header {
  key: string;
  text: string;
  sortable?: boolean;
}

const props = defineProps<{
  listHeader: Header[];
  listData: any[];
  rowKey: string;
  link: string;
  pageData: { totalData: number; currentPage: number; limit: number };
}>();

// --- DATA ---
const isOpenDialogForm = ref(false);
const isOpenDialogAlert = ref(false);
const buttonAction = ref();
buttonAction.value = [
  {
    name: "edit",
    icon: PencilIcon,
  },
  { name: "delete", icon: Trash2Icon },
  { name: "detail", icon: EyeIcon },
];
const dataSelect = ref();
// type form : addData,editData
const typeForm = ref();
const dataDialog = ref();
const premierDate = ref(format(new Date(), "yyyy-MM-dd"));
const query = reactive({
  search: "",
  category: "",
  date: "",
  sortBy: "",
  order: "" as string,
  limit: 10,
  page: 1,
});
const search = ref("");

// --- STORE ---
const store = useStoreFormTvShow();

// --- COMPUTED ---
const listDataTv = computed(() => {
  return props.listData.map((item) => {
    return {
      ...item,
      category_name: item.category.name,
      premiered_at_format: format(new Date(item.premier_at), "dd MMM yyyy"),
    };
  });
});

const listCategory = computed(() => {
  return [
    { label: "Semua Kategori", value: "" },
    ...store.listCategory.map((item) => {
      return { label: item.name, value: item.id };
    }),
  ];
});

//--- WATCH ---
watch(query, () => {
  if (query.category || query.date) {
    fetchData();
  }
});

watch(premierDate, (value) => {
  query.date = formatISO(value);
});

watch(search, (value) => {
  debouncedSearch(value);
});

// --- METHOD ---
const fetchData = () => {
  const { search, category, date, sortBy, order, limit, page } = query;
  store.query = { search, category, date, sortBy, order, limit, page,startDate:'',endDate:'' };
  store.getAllDataTvShow();
};

const debouncedSearch = useDebounceFn((value: string) => {
  if (value.length > 2 || value.length === 0) {
    query.search = value.length > 2 ? value.trim() : "";
    fetchData();
  }
}, 500);

const onCreate = () => {
  typeForm.value = "createData";
  isOpenDialogForm.value = true;
};

const onEdit = (item: any) => {
  dataSelect.value = item;
  typeForm.value = "editData";
  isOpenDialogForm.value = true;
};
const onDelete = (item: any) => {
  dataSelect.value = item;
  dataDialog.value = {
    title: "Hapus Data",
    description: "Apakah Anda yakin ingin menghapus data ini?",
  };
  isOpenDialogAlert.value = true;
};

const onDetailPage = (item: any) => {
  router.push(`${props.link}/${item.id}`);
};

const chooseAction = (data: any, name: string) => {
  switch (name) {
    case "edit":
      return onEdit(data);
    case "delete":
      return onDelete(data);
    default:
      return onDetailPage(data);
  }
};

const sortingData = (value: any) => {
  query.sortBy = value.key;
  query.order = value.order;
  if (value.key === "premier_at_format") {
    query.sortBy = "premier_at";
  }
  fetchData();
};

const changeCurrentPage = (currentPage:number)=>{
  console.log("current-page")
  query.page = currentPage
  fetchData()
}
</script>

<style scoped>
.calendar-date :deep([data-slot="calendar"]) {
  background-color: white;
}

.calendar-date :deep([data-slot="native-select-option"]) {
  color: black;
}

:deep([data-slot="popover-trigger"]) {
  width: 240px;
  margin-left: 8px;
}

@media (min-width: 1200px) {
  tr {
    font-size: 14px;
    font-family: "Lato", sans-serif;
  }
}
</style>
