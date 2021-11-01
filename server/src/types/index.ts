import type { MockAPIType } from '../datasources/mockAPI';

export type DataSourcesType = {
  mockAPI: MockAPIType;
};

export type ApolloContextType = {
  dataSources: DataSourcesType;
}
