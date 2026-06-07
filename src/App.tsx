import { styled } from '@linaria/react';
import { Card } from './components/card';

const CustomHeader = styled.div`
  margin: -20px -20px 10px;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 12px 12px 0 0;
`;

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        padding: 24,
        alignItems: 'flex-start',
      }}
    >
      {/* defaults */}
      <Card title="Card title" description="A short description goes here." />

      {/* custom header: own styled.div passed into the title slot */}
      <Card
        title="Custom header"
        description="Rendered with a custom styled.div as the title slot."
        slots={{ title: CustomHeader }}
        slotProps={{
          title: {
            'data-test': 'test',
          },
        }}
      />
    </div>
  );
}
