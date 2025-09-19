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

// имитация данных от сервера
const serverInputs: InputField[] = [
  { id: '1', amount: 'from server 1' },
  { id: '2', amount: 'from server 2' },
  { id: '3', amount: 'from server 3' },
];

export default function DnD() {
  const methods = useForm<FormValues>({
    defaultValues: { rewards: [] },
  });

  const { control, handleSubmit, reset } = methods;

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'rewards',
  });

  // храним индекс перетаскиваемого элемента
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);

  // имитация загрузки с сервера
  React.useEffect(() => {
    reset({ rewards: serverInputs });
  }, [reset]);

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{
              marginBottom: 8,
              padding: 8,
              border: '1px solid #ccc',
              borderRadius: 4,
              background: '#fafafa',
            }}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()} // разрешаем drop
            onDrop={() => {
              if (dragIndex !== null && dragIndex !== index) {
                move(dragIndex, index);
              }
              setDragIndex(null);
            }}
          >
            <span style={{ marginRight: 8, cursor: 'grab' }}>⇅</span>
            <span>ID: {field.id} </span>
            <Controller
              name={`rewards.${index}.amount`}
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  placeholder={`Input ${index + 1}`}
                />
              )}
            />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
          </div>
        ))}

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
