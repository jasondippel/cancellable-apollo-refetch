/* eslint-disable */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Author of a complete Track or a Module */
export type Person = {
  __typename?: 'Person';
  /** Person's age */
  age?: Maybe<Scalars['Int']>;
  /** Person's first name */
  first_name: Scalars['String'];
  id: Scalars['ID'];
  /** Person's last name */
  last_name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Fetch a list of random people, delay this request the specified amount and return the number of people requested */
  people: Array<Person>;
};


export type QueryPeopleArgs = {
  count: Scalars['Int'];
  delay?: Maybe<Scalars['Int']>;
};
