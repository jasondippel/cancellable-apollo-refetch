import { useCallback, useRef } from 'react';
import { useGetPeopleLazyQuery, GetPeopleLazyQueryHookResult } from '../graphql/getPeople.generated';

const useGetPeople = () => {
  const refetchControllerRef = useRef<AbortController | null>(null);
  const [fetchPeople, queryResult]: GetPeopleLazyQueryHookResult = useGetPeopleLazyQuery();
  const { called, fetchMore } = queryResult;

  const refetchPeople = useCallback(({ variables }: { variables: { count: number, delay: number } }) => {
    const newAbortController = new AbortController();

    // If an abort controller is defined, we abort it. No harm in calling abort for controllers that are
    // part of a request that has already completed becuase it's already completed, so to be safe always
    // call it rather than trying to keep track of whether or not it belongs to a completed query
    if (refetchControllerRef.current !== null) {
      refetchControllerRef.current.abort();
    }
    refetchControllerRef.current = newAbortController;

    // Have to do this so refetch works with HMR (fetchMore is not defined unless fetchPeople has been
    // called at least once and HMR resets this)
    if (!called) {
      return fetchPeople({
        variables,
      });
    }

    return fetchMore?.({
      variables: {
        ...variables,
        isRefetch: true,
      },
      context: {
        fetchOptions: {
          signal: newAbortController.signal,
        },
        queryDeduplication: false,
      },
    });
  }, [called, fetchMore, fetchPeople]);

  return {
    fetchPeople,
    refetchPeople,
    queryResult
  };
};

export default useGetPeople;
