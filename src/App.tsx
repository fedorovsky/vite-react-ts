import * as React from 'react';
import withErrorBoundaryLogger from '@/app/error-boundary/withErrorBoundaryLogger.tsx';

const TestComponent = withErrorBoundaryLogger(
  function TestComponent15() {
    throw new Error('TestComponent-15');
    return (
      <div>
        <h1>Test Component</h1>
      </div>
    );
  },
  function FallbackComponent() {
    return (
      <div>
        <h1>Fallback</h1>
      </div>
    );
  },
);

export default function App() {
  const [isVisible, setVisible] = React.useState(false);

  const toggleVisible = () => {
    setVisible((s) => !s);
  };

  return (
    <div>
      <button onClick={toggleVisible}>Toggle</button>
      {isVisible && <TestComponent />}
    </div>
  );
}
