import { apiService } from '@/core/api/apiService.ts';

import * as v from 'valibot';

const postSchema = v.object({
  id: v.string(),
  title: v.string(),
  description: v.string(),
  category: v.string(),
});

const PostsSchema = v.array(postSchema);

type Post = v.InferOutput<typeof postSchema>;

type PaginationParams = {
  offset: number; // Смещение для запроса
  limit: number; // Количество загружаемых постов за раз
};

type GetPostsArgs = {
  category?: string; // Опциональный фильтр по категории
};

const postsApi = apiService.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.infiniteQuery<Post[], GetPostsArgs, PaginationParams>({
      responseSchema: PostsSchema,
      infiniteQueryOptions: {
        initialPageParam: {
          offset: 0, // Начинаем с 0
          limit: 2, // Загружаем по 2 поста за раз
        },
        getNextPageParam: (
          _lastPage,
          _allPages,
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
      query: ({ pageParam: { offset, limit }, queryArg: { category } }) => {
        const params = new URLSearchParams({
          _start: String(offset),
          _limit: String(limit),
        });

        if (category) {
          params.set('category', category);
        }

        return {
          url: `posts?${params}`, // Формируем URL для запроса с пагинацией
          method: 'GET',
        };
      },
      providesTags: ['Posts'], // Позволяет инвалидировать кешированные данные
    }),
  }),
});

export const { useGetPostsInfiniteQuery } = postsApi;
