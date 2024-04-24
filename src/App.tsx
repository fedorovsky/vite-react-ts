import styled from 'styled-components';
import { Tooltip } from '@/app/Tooltip/Tooltip.tsx';

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  border: 1px solid blue;
  padding: 20px;
  margin-top: 100px;
`;

const Item = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid red;
`;

export default function App() {
  return (
    <Wrapper>
      <Tooltip text="hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ">
        <Item />
      </Tooltip>
      <Tooltip text="hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ">
        <Item />
      </Tooltip>
      <Tooltip text="hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello ">
        <Item />
      </Tooltip>
    </Wrapper>
  );
}
