import * as Styled from './card.styled';
import { Title } from './title';
import { Description } from './description';

export interface CardProps {
  title: string;
  description: string;
}

export const Card = ({ title, description }: CardProps) => {
  return (
    <Styled.Root>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Styled.Root>
  );
};
