import * as React from 'react';
import { Post } from './post';
import * as Styled from './posts.styled.ts';
import { useGetPostsInfiniteQuery } from '@/app/posts/api';

export const Posts = () => {
  const [category, setCategory] = React.useState('');

  const { data, fetchNextPage } = useGetPostsInfiniteQuery({
    category: category,
  });

  console.log('data', data);

  const handleMoreClick = () => {
    fetchNextPage();
  };

  const allResults = data?.pages.flat() ?? [];

  return (
    <>
      <div>
        <button onClick={() => setCategory('news')}>News</button>
        <button onClick={() => setCategory('tutorial')}>Tutorial</button>
        <button onClick={() => setCategory('')}>All</button>
      </div>
      <Styled.Posts>
        {allResults?.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
          />
        ))}
        <button onClick={handleMoreClick}>More</button>
      </Styled.Posts>
    </>
  );
};
