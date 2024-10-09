import { apiService } from '@/core/api/apiService.ts';
import { Post } from './types';

export const postsApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { start: number; limit: number }>({
      query: ({ start, limit }) => `posts?_start=${start}&_limit=${limit}`,
      keepUnusedDataFor: 60,
      providesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = postsApi;
