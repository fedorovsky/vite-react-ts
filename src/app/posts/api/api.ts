import { apiService } from '@/core/api/apiService.ts';
import { Post } from './types';

export const postsApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], { start: number; limit: number }>({
      query: ({ start, limit }) => `posts?_start=${start}&_limit=${limit}`,
      keepUnusedDataFor: 60,
      providesTags: ['Posts'],
      // serializeQueryArgs: ({ endpointName, queryArgs }) => {
      //   return `${endpointName}`;
      // },
      // merge: (currentPosts, newPosts) => {
      //   console.log('========================================================');
      //   console.log('currentPosts', currentPosts.length);
      //   console.log('========================================================');
      //   if (!currentPosts || currentPosts.length === 0) {
      //     // Если нет текущих постов или данные были сброшены, возвращаем только новые посты
      //     return newPosts;
      //   }
      //   // Иначе продолжаем добавлять новые посты к старым (lazy loading)
      //   return [...currentPosts, ...newPosts];
      // },
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg?.start !== previousArg?.start; // Запрашиваем только при изменении start
      // },
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = postsApi;
