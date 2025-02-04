import { v4 as uuidv4 } from 'uuid';
import { apiService } from '@/core/api/apiService.ts';
import { UserType } from './types';

export const userApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], void>({
      query: () => 'users',
      keepUnusedDataFor: 30,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: `users/${updatedUser.id}`,
        method: 'PUT',
        body: {
          name: updatedUser.name,
        },
      }),
      // Оптимистическое начальное обновление
      onQueryStarted: async (updatedUser, { dispatch, queryFulfilled }) => {
        // Оптимистическое обновление: начало
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
            const user = draftUsers.find((u) => u.id === updatedUser.id);
            if (user) {
              // Обновляем имя
              user.name = updatedUser.name;
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
        // Оптимистическое обновление: конец
      },
    }),
    addUser: builder.mutation({
      query: (newUser) => ({
        url: 'users',
        method: 'POST',
        body: {
          id: uuidv4(),
          ...newUser,
        },
      }),
      onQueryStarted: async (newUser, { dispatch, queryFulfilled }) => {
        // Здесь начинается оптимистическое обновление
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draftUsers) => {
            draftUsers.push({
              id: uuidv4(),
              ...newUser,
            });
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo(); // В случае ошибки откатываем изменения
        }
        // Оптимистическое обновление заканчивается здесь
      },
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      onQueryStarted: async (userId, { dispatch, queryFulfilled }) => {
        // Запоминаем текущее состояние для возможного отката
        const patchResult = dispatch(
          userApi.util.updateQueryData('getUsers', undefined, (draft) => {
            const index = draft.findIndex((user) => user.id === userId);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          }),
        );

        try {
          // Ждем завершения запроса
          await queryFulfilled;
        } catch {
          // В случае ошибки используем undo для отката изменений
          patchResult.undo();
        }
      },
      // Не указываем invalidatesTags здесь, так как будем обрабатывать кэш вручную
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserMutation,
} = userApi;
