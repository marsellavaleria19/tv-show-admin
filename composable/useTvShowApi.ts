export const usetvShowApi = () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;

  return {
    fetchAllDataCategories: () => {
      return $fetch(`${baseUrl}/category`);
    },
    fetchAllDataTvShow: (queryFilter: any) => {
      return $fetch(`${baseUrl}/shows`, {
        query: {
          search: queryFilter?.search,
          category: queryFilter?.category,
          date: queryFilter?.date,
          sortBy: queryFilter?.sortBy,
          order: queryFilter?.order,
          page: queryFilter?.page,
          limit: queryFilter?.limit
        },
      });
    },
    fetchAllDataTvShowSync: (query: any) => {
      const { limit, page } = query;
      return $fetch(`${baseUrl}/shows/sync`, { query: { limit, page } });
    },
    fetchLastSync:()=>{
      return  $fetch(`${baseUrl}/shows/last-sync`);
    },
    fetchDataById: (id: string | number) => {
      return $fetch(`${baseUrl}/shows/${id}`);
    },
    create: (payload: any) => {
      return $fetch(`${baseUrl}/shows`, { method: "POST", body: payload });
    },
    update: (id: string | number, payload: any) => {
      return $fetch(`${baseUrl}/shows/${id}`, {
        method: "PATCH",
        body: payload,
      });
    },
    remove: (id: string | number) => {
      return $fetch(`${baseUrl}/shows/${id}`, { method: "DELETE" });
    },
    sync: () => {
      return $fetch(`${baseUrl}/shows/sync`, { method: "POST" });
    },
    fetchDashboard:(query:any) => {
        const { startDate, endDate } = query;
      return $fetch(`${baseUrl}/shows/dashboard`,{query:{startDate,endDate}})
    }
  };
};
