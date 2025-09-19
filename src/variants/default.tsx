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

const rewards = [
  { id: '1', icon: '🍎', title: 'Reward-1' },
  { id: '2', icon: '🍌', title: 'Reward-2' },
  { id: '3', icon: '🍇', title: 'Reward-3' },
];

export default function Default() {
  const methods = useForm<FormValues>({
    defaultValues: { rewards: [] }, // изначально пусто
  });

  const { control, handleSubmit, reset, getValues } = methods;

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
      <button
        type="button"
        onClick={() => append({ id: Date.now().toString(), amount: '' })}
      >
        Add Input
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          // ⚡ наш бизнесовый id
          const businessId = getValues(`rewards.${index}.id`);
          const reward = rewards.find((m) => m.id === businessId);

          return (
            <div key={field.id}>
              <div>
                {reward?.title ?? 'Title'} {reward?.icon ?? 'Icon'}
              </div>
              <div>id: {field.id}</div>
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
          );
        })}

        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
