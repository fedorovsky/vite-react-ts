import { v4 as uuidv4 } from 'uuid';
import * as v from 'valibot';
import { apiService } from '@/core/api/apiService.ts';

const userSchema = v.object({
  id: v.string(),
  name: v.string(),
  // test: v.string(),
});
type User = v.InferOutput<typeof userSchema>;

const usersSchema = v.array(userSchema);

export const userApi = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      keepUnusedDataFor: 30,
      responseSchema: usersSchema,
      providesTags: ['UserList'],
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: `users/${updatedUser.id}`,
        method: 'PUT',
        body: {
          name: updatedUser.name,
        },
      }),
      invalidatesTags: ['UserList'],
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
      invalidatesTags: ['UserList'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['UserList'],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserMutation,
} = userApi;
