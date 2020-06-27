export const reactQueryConfig = {
  queries: {
    staleTime: 30 * 1000, // 30 seconds
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },
  mutations: {
    throwOnError: false,
  },
}
