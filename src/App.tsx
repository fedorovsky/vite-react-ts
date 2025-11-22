import * as React from 'react';
import { styled } from 'styled-components';
import { Card, Root } from '@/components/card';

const CustomTitle = ({ children }: { children: React.ReactNode }) => (
  <div data-custom="custom">{children}</div>
);

const CustomRoot = styled(Root)`
  border: 2px solid red;
`;

export default function App() {
  return (
    <>
      <Card title="Lorem Ipsum" description="Lorem ipsum dolor" />
      <br />
      <Card
        title="Lorem Ipsum"
        description="Lorem ipsum dolor"
        slotProps={{
          title: {
            children: 'Slot Title',
          },
          description: {
            children: 'Slot Description',
          },
        }}
      />
      <br />
      <Card
        title="Custom Title"
        description="Lorem ipsum dolor"
        slots={{
          root: CustomRoot,
          title: CustomTitle,
        }}
        slotProps={{
          root: {
            onClick: () => console.log('root click'),
            style: {
              backgroundColor: 'lightgray',
            },
          },
          title: {
            children: 'Slot Custom Title',
          },
        }}
      />
    </>
  );
}
