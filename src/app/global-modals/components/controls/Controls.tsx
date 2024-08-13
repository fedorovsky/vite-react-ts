import { ControlsModalA } from '@/app/global-modals/components/controls/ControlsModalA.tsx';
import { ControlsModalB } from '@/app/global-modals/components/controls/ControlsModalB.tsx';
import { ControlsModalC } from '@/app/global-modals/components/controls/ControlsModalC.tsx';

export const Controls = () => {
  return (
    <div>
      <ControlsModalA />
      <ControlsModalB />
      <ControlsModalC />
    </div>
  );
};
