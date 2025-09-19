import * as React from 'react';
import {
  useForm,
  FormProvider,
  Controller,
  useFieldArray,
  useFormContext,
} from 'react-hook-form';

type InputField = { id: string; amount: string };

type FormValues = {
  rewards: InputField[];
};

const serverInputs: InputField[] = [
  { id: '1', amount: 'from server 1' },
  { id: '2', amount: 'from server 2' },
];

const rewards = [
  { id: '1', icon: '🍎', title: 'Reward-1' },
  { id: '2', icon: '🍌', title: 'Reward-2' },
  { id: '3', icon: '🍇', title: 'Reward-3' },
  { id: '4', icon: '🍉', title: 'Reward-4' },
  { id: '5', icon: '🍓', title: 'Reward-5' },
  { id: '6', icon: '🍒', title: 'Reward-6' },
  { id: '7', icon: '🍑', title: 'Reward-7' },
  { id: '8', icon: '🍍', title: 'Reward-8' },
  { id: '9', icon: '🥭', title: 'Reward-9' },
  { id: '10', icon: '🥝', title: 'Reward-10' },
];

// 🔹 Component that renders rewards list
function RewardsFields() {
  const { control, getValues } = useFormContext<FormValues>(); // ✅ get from context

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'rewards',
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => append({ id: Date.now().toString(), amount: '' })}
      >
        Add Input
      </button>

      {fields.map((field, index) => {
        const businessId = getValues(`rewards.${index}.id`);
        const reward = rewards.find((m) => m.id === businessId);

        return (
          <div key={field.id}>
            <div>
              {reward?.title ?? 'Title'} {reward?.icon ?? 'Icon'}
            </div>
            <div>id: {businessId}</div>
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
    </div>
  );
}

export default function Default() {
  const methods = useForm<FormValues>({
    defaultValues: { rewards: [] },
  });

  React.useEffect(() => {
    methods.reset({ rewards: serverInputs });
  }, [methods]);

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <RewardsFields />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
}
