import { defineStore } from "pinia";
import { usetvShowApi } from "~/composable/useTvShowApi";

export const useStoreFormTvShow = defineStore("tv-show", {
  state: () => ({
    payload: {
      id_show: "",
      name_show: "",
      description: "",
      premier_at: "",
      categoryId: 1,
    },
    listCategory: [] as Array<{
      id: string | number;
      name: string;
    }>,
    listDataTvShow: [],
    listDataTvShowSync: [],
    dataDashboard: {
    byCategory: [] as { category: string; total: number }[],
    byPremierDate: [] as { date: string; total: number }[],
    totalData:0 as number
  },
    detailTvShow: {},
    query: {
      search: "",
      category: "",
      date: "",
      sortBy: "",
      order: "",
      limit: 10,
      page: 1,
      startDate:'',
      endDate:''
    },
    pagination: { totalData: 0, currentPage: 1, limit: 10 },
    lastSyncedDate : ''
  }),

  actions: {
    async createData() {
      try {
        const { create } = usetvShowApi();
        const response = await create(this.payload);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async updateData(id: string | number) {
      try {
        const { update } = usetvShowApi();
        const response = await update(id, this.payload);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async deleteData(id: string | number) {
      try {
        const { remove } = usetvShowApi();
        const response = remove(id);
        return response;
      } catch (error) {
        throw error;
      }
    },
    async syncData() {
      try {
        const { sync } = usetvShowApi();
        const response = sync();
        return response;
      } catch (error) {
        throw error;
      }
    },
    async getAllDataCategories() {
      try {
        const { fetchAllDataCategories } = usetvShowApi();
        const response = (await fetchAllDataCategories()) as any;
        this.listCategory = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getAllDataTvShow() {
      try {
        const { fetchAllDataTvShow } = usetvShowApi();
        const response = (await fetchAllDataTvShow(this.query)) as any;
        this.listDataTvShow = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getAllDataTvShowSync() {
      try {
        const { fetchAllDataTvShowSync } = usetvShowApi();
        const response = (await fetchAllDataTvShowSync(this.query)) as any;
        this.listDataTvShowSync = response.data;
        this.pagination = {
          limit: response.meta.limit,
          totalData: response.meta.totalData,
          currentPage: response.meta.currentPage,
        };
      } catch (error) {
        console.error(error);
      }
    },
       async getLastSync() {
      try {
        const { fetchLastSync } = usetvShowApi();
        const response = (await fetchLastSync()) as any;
        this.lastSyncedDate = response.last_synced_at;
      } catch (error) {
        console.error(error);
      }
    },
    async getDataTvShowById(id: string | number) {
      try {
        const { fetchDataById } = usetvShowApi();
        const response = (await fetchDataById(id)) as any;
        this.detailTvShow = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getDataDashboard(){
      try{
        const {fetchDashboard} = usetvShowApi();
        const response = (await fetchDashboard(this.query)) as any
        this.dataDashboard = response.data        
      }catch(error){
        console.error(error)
      }
    }
  },
});
