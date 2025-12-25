<template>
  <PagePanel>
    <div class="flex justify-between w-full">
      <p>Terakhir update {{lastSyncedDate }}</p>
      <Button
        class="bg-[#022B55] text-white cursor-pointer hover:bg-gray-500"
        @click="onSynchronize"
        >Synchronize</Button
      >
    </div>
    <div class="mt-5">
      <BaseTableData
        :list-header="tvShowSyncTableHeaders"
        :list-data="listData"
        row-key="id_show"
        :page-data="pagination"
        @current-page="changeCurrentPage"
      />
    </div>
  </PagePanel>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { toast } from "vue-sonner";
import { tvShowSyncTableHeaders } from "~/constant/data-tv-show";
import { useStoreFormTvShow } from "~/store/tv-show";
import { useStoreLayoutItem } from "~/store/layout-item";

// --- STORE ---
const storeFormTvShow = useStoreFormTvShow();
const storeLayoutItem = useStoreLayoutItem();

// COMPUTED ---
const listData = computed(() => {
  return storeFormTvShow.listDataTvShowSync.map((item: any) => {
    return {
      ...item,
      category_name: item.category.name,
      last_synced_format: format(
        new Date(item.last_synced_at),
        "dd MMM yyyy HH:mm:ss"
      ),
    };
  });
});

const lastSyncedDate = computed(()=>{
  return storeFormTvShow.lastSyncedDate ? format(storeFormTvShow.lastSyncedDate,'dd MMMM yyy HH:mm:ss') : '-'
})

const pagination = computed(() => {
  return storeFormTvShow.pagination;
});

// --- ON MOUNTED ---
onMounted(() => {
  storeFormTvShow.getAllDataTvShowSync();
  storeFormTvShow.getLastSync();
  storeLayoutItem.setNavigations([
    {
      label: "Synchronize Data",
      link: "/synchronize",
    },
  ]);
});


// --- STORE ---
const store = useStoreFormTvShow()

//--- METHOD ---
const onSynchronize = async () => {
  const id = toast.loading("Loading...");
  try {
    await storeFormTvShow.syncData();
    store.getAllDataTvShowSync()
    store.getLastSync()     
    toast.success("Sinkronisasi data berhasil dilakukan.", { id });
  } catch (error) {
    toast.error("Sinkronisasi data gagal dilakukan.", { id });
  }
};

const changeCurrentPage = (currentPage:number)=>{
  store.query.page = currentPage
  store.getAllDataTvShowSync()
}
</script>
