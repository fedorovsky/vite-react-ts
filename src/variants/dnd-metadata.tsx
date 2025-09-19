import * as React from 'react';
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
} from 'react-hook-form';

type InputField = { id: string; amount: string };

type FormValues = {
  rewards: InputField[];
};

// данные от сервера (для формы)
const serverInputs: InputField[] = [
  { id: '1', amount: 'from server 1' },
  { id: '2', amount: 'from server 2' },
  { id: '3', amount: 'from server 3' },
];

// метаданные
const meta = [
  { id: '1', icon: '🍎', title: 'Apple' },
  { id: '2', icon: '🍌', title: 'Banana' },
  { id: '3', icon: '🍇', title: 'Grapes' },
];

export default function DndMetadata() {
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
        {fields.map((field, index) => {
          // ⚡ наш бизнесовый id
          const businessId = getValues(`rewards.${index}.id`);
          const extra = meta.find((m) => m.id === businessId);

          return (
            <div
              key={field.id} // ⚡ служебный id из useFieldArray
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
              onDragStart={() => setDragIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragIndex !== null && dragIndex !== index) {
                  move(dragIndex, index);
                }
                setDragIndex(null);
              }}
            >
              <span style={{ cursor: 'grab' }}>⇅</span>

              {/* показываем бизнесовый id */}
              <span>ID: {businessId}</span>

              {/* подмешиваем метаданные */}
              {extra && (
                <>
                  <span>{extra.icon}</span>
                  <strong>{extra.title}</strong>
                </>
              )}

              {/* поле формы */}
              <Controller
                name={`rewards.${index}.amount`}
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder={`Input ${index + 1}`}
                    onDragStart={(e) => e.stopPropagation()}
                  />
                )}
              />

              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => append({ id: Date.now().toString(), amount: '' })}
        >
          Add Input
        </button>

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
