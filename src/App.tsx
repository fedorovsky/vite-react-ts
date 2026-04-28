import * as React from 'react';
import { Select } from './select';

const fruits = [
  { value: 'apple', label: 'Apple 🍎' },
  { value: 'banana', label: 'Banana 🍌' },
  { value: 'cherry', label: 'Cherry 🍒' },
  { value: 'grape', label: 'Grape 🍇' },
  { value: 'mango', label: 'Mango 🥭' },
];

function ControlledExample() {
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <section>
      <h2>Controlled</h2>
      <p>Selected: {value ?? 'nothing'}</p>
      <Select.Root
        value={value}
        onValueChange={(v) => setValue(v)}
        placeholder="Pick a fruit…"
      >
        {fruits.map((item) => (
          <Select.Item key={item.value} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Root>
    </section>
  );
}

function DefaultValueExample() {
  const [value, setValue] = React.useState<string | null>('banana');

  return (
    <section>
      <h2>With default value</h2>
      <p>Selected: {value ?? 'nothing'}</p>
      <Select.Root
        value={value}
        onValueChange={(v) => setValue(v)}
        placeholder="Pick a fruit…"
      >
        {fruits.map((item) => (
          <Select.Item key={item.value} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Root>
    </section>
  );
}

function MultipleExample() {
  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <section>
      <h2>Multiple (controlled)</h2>
      <p>Selected: {selected.length ? selected.join(', ') : 'nothing'}</p>
      <Select.Root
        multiple
        value={selected}
        onValueChange={(v) => setSelected(v)}
        placeholder="Pick fruits…"
      >
        {fruits.map((item) => (
          <Select.Item key={item.value} value={item.value}>
            {item.label}
          </Select.Item>
        ))}
      </Select.Root>
    </section>
  );
}

export default function App() {
  return (
    <div
      style={{
        padding: 40,
        fontFamily: 'sans-serif',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
      }}
    >
      <ControlledExample />
      <DefaultValueExample />
      <MultipleExample />
    </div>
  );
}
