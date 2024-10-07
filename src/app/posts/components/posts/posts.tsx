import React from 'react';
import { Post } from './post';
import * as Styled from './posts.styled.ts';
import { useGetPostsQuery, Post as PostType } from '@/app/posts/api';

const LIMIT = 2;

export const Posts = () => {
  const [offset, setOffset] = React.useState(0);
  const [postList, setPostList] = React.useState<PostType[]>([]);

  const { data } = useGetPostsQuery({ start: offset, limit: LIMIT });

  React.useEffect(() => {
    if (data) {
      setPostList((prevPosts) => {
        // Избегаем дублирования постов по id
        const newPosts = data.filter(
          (newPost) => !prevPosts.some((post) => post.id === newPost.id),
        );
        return [...prevPosts, ...newPosts];
      });
    }
  }, [data]);

  const handleMoreClick = () => {
    setOffset((offset) => offset + LIMIT);
  };

  return (
    <Styled.Posts>
      {postList?.map((post) => (
        <Post key={post.id} title={post.title} description={post.description} />
      ))}
      <div>offset: {offset}</div>
      <button onClick={handleMoreClick}>More</button>
    </Styled.Posts>
  );
};
