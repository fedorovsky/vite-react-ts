import { useAppSelector } from '@/core/hooks/useAppSelector.ts';
import { counterModule } from '@/app/counter';

export const Value = () => {
  const value = useAppSelector(counterModule.selectors.value);

  return <h1 className="text-3xl font-bold">value: {value}</h1>;
};
