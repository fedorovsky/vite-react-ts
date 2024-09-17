import { useState } from 'react';
import { FeatureOne } from '@/app/feature-one';
import { FeatureTwo } from '@/app/feature-two';
import { AddUser } from '@/app/add-user';

export default function App() {
  const [isOpenFeatureOne, setIsOpenFeatureOne] = useState(true);
  const [isOpenFeatureTwo, setIsOpenFeatureTwo] = useState(true);

  const handleClickToggleFeatureOne = () => setIsOpenFeatureOne((s) => !s);
  const handleClickToggleFeatureTwo = () => setIsOpenFeatureTwo((s) => !s);

  return (
    <div className="p-2">
      <AddUser />
      <div className="flex gap-2 my-2">
        <button
          onClick={handleClickToggleFeatureOne}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Toggle Feature One
        </button>
        <button
          onClick={handleClickToggleFeatureTwo}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Toggle Feature Two
        </button>
      </div>
      <div className="flex">
        {isOpenFeatureOne && <FeatureOne />}
        {isOpenFeatureTwo && <FeatureTwo />}
      </div>
    </div>
  );
}
