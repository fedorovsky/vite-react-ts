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
  { id: 3, amount: 300 },
  { id: 4, amount: 400 },
  { id: 5, amount: 500 },
];

// метаданные (иконка, заголовок и т.п.)
const meta = [
  { id: 1, icon: '🍎', title: 'Apple' },
  { id: 2, icon: '🍌', title: 'Banana' },
  { id: 3, icon: '🍇', title: 'Grapes' },
  { id: 4, icon: '🍉', title: 'Watermelon' },
  { id: 5, icon: '🍓', title: 'Strawberry' },
];

export default function DnD() {
  const methods = useForm<FormValues>({
    defaultValues: { rewards: [] },
  });

  const { control, handleSubmit, reset, getValues } = methods;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'rewards',
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
        <button
          type="button"
          onClick={() => append({ id: Date.now(), amount: 0 })}
        >
          Add Input
        </button>

        {fields.map((field, index) => {
          const businessId = getValues(`rewards.${index}.id`);
          const extra = meta.find((m) => m.id === businessId);

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
              {/* метаданные */}
              {extra && (
                <>
                  <span>{extra.icon}</span>
                  <strong>{extra.title}</strong>
                </>
              )}

              {/* id */}
              <span>ID: {field.id}</span>

              {/* поле формы */}
              <Controller
                name={`rewards.${index}.amount`}
                control={control}
                render={({ field }) => (
                  <input type="text" {...field} placeholder="Amount" />
                )}
              />

              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          );
        })}

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
