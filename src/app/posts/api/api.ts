import { apiService } from '@/core/api/apiService.ts';
import { Post } from './types';

// Определяем параметры пагинации
type ProjectsInitialPageParam = {
  offset: number; // Смещение для запроса
  limit: number; // Количество загружаемых постов за раз
};

export const postsApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.infiniteQuery<Post[], void, ProjectsInitialPageParam>({
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0, // Начинаем с 0
          limit: 2, // Загружаем по 2 поста за раз
        },
        getNextPageParam: (
          lastPage,
          allPages,
          lastPageParam,
          allPageParams,
        ) => {
          const nextOffset = lastPageParam.offset + lastPageParam.limit;
          return {
            ...lastPageParam,
            offset: nextOffset, // Увеличиваем `offset` для следующего запроса
          };
        },
      },
      query: ({ pageParam: { offset, limit } }) => ({
        url: `posts?_start=${offset}&_limit=${limit}`, // Формируем URL для запроса с пагинацией
        method: 'GET',
      }),
      providesTags: ['Posts'], // Позволяет инвалидировать кешированные данные
    }),
  }),
});

export const { useGetPostsInfiniteQuery } = postsApi;
