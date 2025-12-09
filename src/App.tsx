import * as React from 'react';
import {
  OverlayScrollbarsComponent,
  type OverlayScrollbarsComponentRef,
} from 'overlayscrollbars-react';
import style from './style.module.css';

const storage = {
  instance: null,
};

const Child = () => {
  React.useEffect(() => {
    console.log('=========================');
    console.log('Child: useEffect');
    console.log(storage.instance);
    console.log('=========================');
  }, []);

  return (
    <div>
      <h2>Child component</h2>
    </div>
  );
};

export default function App() {
  const osRef = React.useRef<OverlayScrollbarsComponentRef>(null);

  React.useEffect(() => {
    storage.instance = osRef.current?.osInstance();

    console.log('==================');
    console.log('Parent: useEffect');
    console.log('osRef', osRef);
    console.log('osRef.current?.osInstance()', osRef.current?.osInstance());
    console.log('==================');
  }, []);

  const handleClickButton = () => {
    console.log('==================');
    console.log('Click', osRef.current?.osInstance());
    console.log('==================');
  };

  const initialized = (instance: any) => {
    console.log('==========');
    console.log('initialized', instance);
    console.log('==========');
  };

  return (
    <OverlayScrollbarsComponent
      defer
      className={style.root}
      ref={osRef}
      events={{
        initialized: initialized,
        // destroyed: () => activateEvent('destroyed'),
        // updated: () => activateEvent('updated'),
        // scroll: () => activateEvent('scroll'),
      }}
    >
      <button onClick={handleClickButton}>Get Instance</button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium
        ad, aperiam deleniti dolor dolores, hic laudantium non pariatur quas
        quisquam sapiente sit temporibus? Ad amet beatae, commodi delectus quis
        ratione reprehenderit sed. Ab animi assumenda at, commodi cum dolorem,
        dolores ea eos excepturi facere fugiat, ipsam iste iure molestiae nemo
        odio officia pariatur quaerat quis quod repudiandae rerum sapiente
        similique tenetur ut. Aliquid aperiam asperiores aspernatur cum,
        deleniti ea, eaque est eum facilis fugiat harum illum in incidunt iste
        laborum natus necessitatibus neque odio placeat possimus quam quasi quia
        rem tempora ut vel voluptas. Inventore maiores reprehenderit vel
        voluptatibus!
      </p>
      <Child />
    </OverlayScrollbarsComponent>
  );
}
