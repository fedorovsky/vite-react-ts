import { Post } from './post';
import * as Styled from './posts.styled.ts';
import { useGetPostsInfiniteQuery } from '@/app/posts/api';

export const Posts = () => {
  const { data, fetchNextPage } = useGetPostsInfiniteQuery();

  console.log('data', data);

  const handleMoreClick = () => {
    fetchNextPage();
  };

  const allResults = data?.pages.flat() ?? [];

  return (
    <Styled.Posts>
      {allResults?.map((post) => (
        <Post key={post.id} title={post.title} description={post.description} />
      ))}
      <button onClick={handleMoreClick}>More</button>
    </Styled.Posts>
  );
};
