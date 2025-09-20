import Default from '@/variants/default.tsx';
import Move from '@/variants/move.tsx';
import DnD from '@/variants/dnd.tsx';
import DndMetadata from '@/variants/dnd-metadata.tsx';
import DndMetadataPicker from '@/variants/dnd-metadata-picker.tsx';

export default function App() {
  return (
    <div>
      {/*<Default />*/}
      {/*<Move />*/}
      {/*<DnD />*/}
      {/*<DndMetadata />*/}
      <DndMetadataPicker />
    </div>
  );
}
