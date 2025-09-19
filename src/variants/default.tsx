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
];

export default function Default() {
  const methods = useForm<FormValues>({
    defaultValues: { rewards: [] }, // изначально пусто
  });

  const { control, handleSubmit, reset } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rewards',
  });

  // имитация загрузки с сервера
  React.useEffect(() => {
    reset({ rewards: serverInputs });
  }, [reset]);

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  console.log('=================');
  console.log('fields', fields);
  console.log('=================');

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            {/* показываем id (только для чтения) */}
            <span>ID: {field.id}</span>
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
