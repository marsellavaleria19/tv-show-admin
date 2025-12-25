<template>
  <Button variant="outline" class="border-[#022B55] mb-4" @click="backToPage()"
    ><ArrowLeft class="mt-1" />Kembali</Button
  >
  <PagePanel>
    <PageHeader :title="title" />
    <Table class="border border-[#022B55] rounded-2xl overflow-hidden">
      <TableHeader>
        <TableRow
          class="text-white font-lato text-[20px] font-lato bg-[#022B55] rounded-t-2xl"
        >
          <TableHead colspan="2" class="font-extrabold p-4 rounded-t-lg"
            >Informasi Acara</TableHead
          >
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell class="detail-label"> ID Acara </TableCell>
          <TableCell>
            {{ detail.id_show }}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="detail-label"> Nama Acara </TableCell>
          <TableCell>
            {{ detail.name_show }}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="detail-label"> Kategori </TableCell>
          <TableCell>
            {{ detail.category?.name }}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="detail-label">Tanggal Tayang</TableCell>
          <TableCell>
            {{ detail.premier_at }}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell class="detail-label">Deskripsi</TableCell>
          <TableCell>
            {{ detail.description }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </PagePanel>
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
import { ArrowLeft } from "lucide-vue-next";

// --- PROPS ---
const props = defineProps<{
  title: string;
  detail?: any;
  link: string;
}>();

const router = useRouter();

// --- METHOD ---
const backToPage = () => {
  router.push(props.link);
};
</script>

<style scoped>
.detail-label {
  font-weight: 700;
  width: 200px;
}

tr {
  font-size: 15px;
  font-family: "Lato", sans-serif;
}
tr:nth-child(even) {
  background-color: #fafafa;
  padding: 10px 20px;
}
td {
  border: 1px solid #eeeeee;
  padding: 10px 20px;
}
</style>
