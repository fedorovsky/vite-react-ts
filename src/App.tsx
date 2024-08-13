import { Debugger } from '@/app/global-modals/components/Debugger.tsx';
import { Controls } from '@/app/global-modals/components/controls/Controls.tsx';
import { Modals } from '@/app/global-modals/components/modals/Modals.tsx';

export default function App() {
  return (
    <div className="p-1">
      <div className="flex mb-2">
        <div className="w-1/2">
          <h2 className="border-b-2 pb-1 mb-2">Modals View</h2>
          <Modals />
        </div>
        <div className="w-1/2">
          <h2 className="border-b-2 pb-1 mb-2">Waiting List Actions</h2>
          <Controls />
        </div>
      </div>
      <Debugger />
    </div>
  );
}
