import { Counter } from '@/app/counter';
import './index.css';
import { Notifications } from '@/app/notification';

export default function App() {
  return (
    <div className="border m-1 p-1">
      <Notifications />
      <Counter />
      <Counter />
    </div>
  );
}
