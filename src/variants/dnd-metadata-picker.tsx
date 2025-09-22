import * as React from 'react';
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
} from 'react-hook-form';

type InputField = { id: number; amount: number };
type FormValues = { rewards: InputField[] };

// данные от сервера (для формы)
const serverInputs: InputField[] = [
  { id: 1, amount: 100 },
  { id: 2, amount: 200 },
];

const meta = [
  { id: 1, icon: '🍎', title: 'Apple' },
  { id: 2, icon: '🍌', title: 'Banana' },
  { id: 3, icon: '🍇', title: 'Grapes' },
  { id: 4, icon: '🍉', title: 'Watermelon' },
  { id: 5, icon: '🍓', title: 'Strawberry' },
];

function MetaPicker({
  fields,
  onAdd,
  onRemove,
}: {
  fields: { id: number; amount: number; key: string }[];
  onAdd: (id: number) => void;
  onRemove: (key: number) => void;
}) {
  return (
    <div style={{ marginBottom: 16, border: '1px solid #ccc', padding: 8 }}>
      <h3>Meta list:</h3>
      {meta.map((item) => {
        const alreadyAdded = fields.some((field) => field.id === item.id);
        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              marginBottom: 8,
              borderBottom: '1px solid #eee',
              paddingBottom: 4,
            }}
          >
            <span>
              {item.icon} {item.title} {item.id}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => onAdd(item.id)}
                disabled={alreadyAdded}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                disabled={!alreadyAdded}
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function DndMetadataPicker() {
  const methods = useForm<FormValues>({
    defaultValues: { rewards: [] },
  });

  const { control, handleSubmit, reset } = methods;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'rewards',
    keyName: 'key',
  });

  const [dragIndex, setDragIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    reset({ rewards: serverInputs });
  }, [reset]);

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MetaPicker
          fields={fields}
          onAdd={(id) => {
            append({ id, amount: 0 });
          }}
          onRemove={(id) => {
            const index = fields.findIndex((field) => field.id === id);
            if (index >= 0) {
              remove(index);
            }
          }}
        />

        <div style={{ border: '1px solid #ccc', padding: 8 }}>
          {fields.map((field, index) => {
            const extra = meta.find((m) => m.id === field.id);
            return (
              <div
                key={field.id}
                style={{
                  marginBottom: 8,
                  padding: 8,
                  border: '1px solid #ccc',
                  borderRadius: 4,
                  background: '#fafafa',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                draggable
                onDragStart={(e) => {
                  setDragIndex(index);
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onDrop={() => {
                  if (dragIndex !== null && dragIndex !== index) {
                    move(dragIndex, index);
                  }
                  setDragIndex(null);
                }}
              >
                {extra && (
                  <>
                    <span>{extra.icon}</span>
                    <span>{extra.title}</span>
                  </>
                )}

                <Controller
                  name={`rewards.${index}.amount`}
                  control={control}
                  rules={{
                    required: 'Amount is required',
                    min: { value: 0, message: 'Must be at least 0' },
                    max: {
                      value: 100_000_000,
                      message: 'Must be less than or equal to 100,000,000',
                    },
                    validate: (value) =>
                      !isNaN(Number(value)) || 'Must be a number',
                  }}
                  render={({ field, fieldState }) => (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <input type="text" {...field} placeholder="amount" />
                      {fieldState.error && (
                        <span style={{ color: 'red', fontSize: '12px' }}>
                          {fieldState.error.message}
                        </span>
                      )}
                    </div>
                  )}
                />

                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
