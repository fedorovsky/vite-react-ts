import * as React from 'react';
import { FeatureOne } from '@/app/feature-one';
import { FeatureTwo } from '@/app/feature-two';
import { useState } from 'react';

export default function App() {
  const [isOpenFeatureOne, setIsOpenFeatureOne] = useState(true);
  const [isOpenFeatureTwo, setIsOpenFeatureTwo] = useState(false);

  const handleClickToggleFeatureOne = () => setIsOpenFeatureOne((s) => !s);
  const handleClickToggleFeatureTwo = () => setIsOpenFeatureTwo((s) => !s);

  return (
    <div>
      <div>
        <button onClick={handleClickToggleFeatureOne}>
          Toggle Feature One
        </button>
        <button onClick={handleClickToggleFeatureTwo}>
          Toggle Feature Two
        </button>
      </div>
      <div>
        {isOpenFeatureOne && <FeatureOne />}
        {isOpenFeatureTwo && <FeatureTwo />}
      </div>
    </div>
  );
}
