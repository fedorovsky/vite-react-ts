import * as React from 'react';
import { EdgeConfig } from '@/features/edge-config';

export default function App() {
  const [isVisibleConfig, setIsVisibleConfig] = React.useState(true);

  return (
    <div>
      <div>
        <button onClick={() => setIsVisibleConfig((prev) => !prev)}>
          {isVisibleConfig ? 'Hide EdgeConfig' : 'Show EdgeConfig'}
        </button>
      </div>
      <br />
      {isVisibleConfig && <EdgeConfig />}
    </div>
  );
}
