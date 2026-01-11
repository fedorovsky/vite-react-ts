import { useTick } from '@/shared/hooks/use-tick.ts';
import { generateUsers } from '@/shared/lib/mock/generate-users.ts';

const TICK_INTERVAL_MS = 1_000;

const users = generateUsers(1_000);

export const Counter = () => {
  const { tick, start, stop } = useTick(TICK_INTERVAL_MS, {
    pauseOnBlur: false,
  });

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
            <h2>Name: {user.name}</h2>
            <div>Date: {user.date.toString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
