import { useState, useCallback } from 'react';
import useGetPeople from './hooks/useGetPeople';

const App = () => {
  const [count, setCount] = useState<number>(5);
  const [delay, setDelay] = useState<number>(0);
  const { fetchPeople, refetchPeople, queryResult } = useGetPeople();
  const { called } = queryResult;

  const handleCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = parseInt(e.target.value || '0', 10)
      setCount(newVal);
    },
    [setCount],
  );

  const handleDelayChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVal = parseInt(e.target.value || '0', 10)
      setDelay(newVal);
    },
    [setDelay],
  );

  const handleFetch = useCallback(() => {
    const variables = {
      count,
      delay,
    };

    if (!called) {
      fetchPeople({
        variables,
      });
    } else {
      refetchPeople({
        variables,
      });
    }
  }, [called, count, delay, fetchPeople, refetchPeople]);

  return (
    <div>
      <label>
        Number of people:{' '}
        <input type='number' value={count} onChange={handleCountChange} min="0" max="100" />
      </label>
      <br />
      <label>
        Delay:{' '}
        <input type='number' value={delay} onChange={handleDelayChange} min="0" max="20000" step="1000" />
      </label>
      <br />
      <button onClick={handleFetch}>Trigger {called ? 'refetch' : 'fetch'}!</button>
      <p>Tip: I'm lazy so this is a basic UI. Look at the network tab in your dev tools to see what happens with the requests</p>
    </div>
  );
}

export default App;
