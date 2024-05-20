import { Value } from './Value';
import { useDispatch } from 'react-redux';
import { counterModule } from '@/app/counter';

export const Counter = () => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(counterModule.actions.increment());
  };

  const handleDecrement = () => {
    dispatch(counterModule.actions.decrement());
  };

  return (
    <div className="border m-1 p-1">
      <button
        onClick={handleIncrement}
        className="px-2 py-1 text-white bg-blue-500 rounded shadow-md active:bg-blue-600 m-1"
      >
        +
      </button>
      <button
        onClick={handleDecrement}
        className="px-2 py-1 text-white bg-blue-500 rounded shadow-md active:bg-blue-600 m-1"
      >
        -
      </button>
      <Value />
    </div>
  );
};
