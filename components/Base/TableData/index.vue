<template>
  <Table class="mt-5">
    <TableHeader class="bg-[#022B55] h-[42px] !rounded-r-lg">
      <TableRow class="text-white font-lato text-sm font-bold">
        <TableHead
          v-for="(header, index) in listHeader"
          :key="header.key"
          :class="`border-r border-white px-3 w-[300px] ${
            index == 0
              ? 'rounded-tl-lg'
              : index == listHeader.length - 1
              ? 'rounded-tr-lg'
              : ''
          }`"
        >
          <div v-if="header.sortable" class="flex justify-between items-center">
            {{ header.text }}
            <Button class="cursor-pointer" @click="sortAction(header.key)">
              <component
                :is="
                  sortBy === header.key
                    ? order === 'ASC'
                      ? ArrowUp
                      : ArrowDown
                    : ArrowUp
                "
                :class="[
                  'stroke-3',
                  sortBy === header.key ? 'stroke-gray-300' : 'stroke-gray-600',
                ]"
              />
            </Button>
          </div>
          <div v-else class="text-center">{{ header.text }}</div></TableHead
        >
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="data in listData" :key="rowKey">
        <TableCell
          class="font-medium"
          v-for="header in listHeader"
          :key="header.key"
        >
          <slot :name="header.key" :item="data">
            {{ data[header.key] }}
          </slot>
        </TableCell>
      </TableRow>
      <TableRow v-show="listData.length < 1" class="h-[400px] text-center">
        <TableCell :colspan="listHeader.length" class="!border-[#022B55]">
          Data Tidak Tersedia
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
  <BasePagination
    :total-data="pageData?.totalData"
    :default-page="pageData?.currentPage"
    :item-per-page="pageData?.limit"
    @change-page="changePage"
    class="mt-2 text-[#022B55] justify-self-end"
  />
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-vue-next";

interface Header {
  key: string;
  text: string;
  sortable?: boolean;
}

// --- PROPS ---
const props = defineProps<{
  listHeader: Header[];
  listData: any[];
  pageData: { totalData: number; currentPage: number; limit: number };
  rowKey: string;
}>();

// --- DATA ---
const sortBy = ref();
const order = ref("");

// --- EMIT ---
const emit = defineEmits<{ (e: "sort", value: object): void,(e:'current-page',page:number):void }>();

// --- METHOD ---
const sortAction = (key: string) => {
  const isSortBy = sortBy.value === key;
  if (isSortBy && order.value === "ASC") {
    order.value = "DESC";
  } else if (order.value === "DESC" && isSortBy) {
    order.value = "";
    sortBy.value = "";
  } else {
    sortBy.value = key;
    order.value = "ASC";
  }

  if (!isSortBy) {
    sortBy.value = key;
    order.value = "ASC";
  }

  emit("sort", { key: sortBy.value, order: order.value });
};

const changePage = (page:number)=>{
  emit('current-page',page)
}
</script>

<style scoped>
tr {
  font-size: 14px;
  font-family: "Lato", sans-serif;
}
tr:nth-child(even) {
  background-color: #fafafa;
}
td {
  border: 1px solid #eeeeee;
  padding: 10px 20px;
}
</style>
