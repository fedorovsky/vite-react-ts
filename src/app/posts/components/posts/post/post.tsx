import * as Styled from './post.styled.ts';

interface PostProps {
  title: string;
  description: string;
}

export const Post = ({ title, description }: PostProps) => {
  return (
    <Styled.Post>
      <div>{title}</div>
      <div>{description}</div>
    </Styled.Post>
  );
};
