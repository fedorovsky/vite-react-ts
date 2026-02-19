import { apiService } from '@/core/api';

export const edgeConfigApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    getConfig: build.query({
      query: ({ lang }: { lang: string }) => ({
        url: `/desktop-api/10.13.0/${lang}/newsfeed`,
        method: 'POST',
        headers: {
          'pl-client': 'true',
          'Content-Type': 'json',
        },
        body: {},
      }),
      providesTags: ['EdgeConfig'],
      keepUnusedDataFor: 1,
    }),
  }),
});

export const { useGetConfigQuery } = edgeConfigApi;
