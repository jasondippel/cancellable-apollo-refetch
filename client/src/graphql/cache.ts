import { InMemoryCache } from '@apollo/client';

let cache: InMemoryCache | null = null;

const createCache = () => {
  // Interested in learning more about pagination and Apollo? Here's a useful link
  // https://www.apollographql.com/docs/react/pagination/core-api/#merging-paginated-results
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          people: {
            keyArgs: false,
            // Very basic merge function. If query was marked as a refetch, replace what was
            // previously in cache with the incomming data, otherwise append data to end of
            // existing list.
            merge(
              existing: Array<any> | undefined = [],
              incoming: Array<any>,
              options: {
                variables?: any;
              }
            ) {
              const isRefetch = options.variables?.isRefetch === true;
              if (isRefetch) return [...incoming];
              return [...existing, ...incoming];
            },
          }
        }
      }
    }
  });
};

export const getCache = (): InMemoryCache => {
  if (!cache) cache = createCache();
  return cache;
};
