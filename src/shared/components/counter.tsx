import { useTick } from '@/shared/hooks/use-tick.ts';

const TICK_INTERVAL_MS = 1_000;

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
  { id: 3, name: 'User 3' },
  { id: 4, name: 'User 4' },
  { id: 5, name: 'User 5' },
];

export const Counter = () => {
  const { tick, start, stop } = useTick(TICK_INTERVAL_MS);

  console.log('==============');
  console.log('tick', tick);
  console.log('==============');

  const usersWithDate = users.map((user) => ({
    ...user,
    date: new Date(),
  }));

  return (
    <div>
      <h1>Counter</h1>
      <div>Tick: {tick}</div>
      <div>
        <button onClick={start}>start</button>
        <button onClick={stop}>stop</button>
      </div>
      <ul>
        {usersWithDate.map((user) => (
          <li key={user.id}>
            <div>Name: {user.name}</div>
            <div>Date: {user.date.toString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
