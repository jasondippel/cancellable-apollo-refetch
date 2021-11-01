import { DataSource } from 'apollo-datasource';
import Faker from 'faker/locale/en_CA';
import type { Person as GeneratePersonType } from '../generated/graphql';

type Person = Pick<GeneratePersonType, 'id' | 'first_name' | 'last_name' | 'age'>;

export interface MockAPIType {
  getPeople(count: number, delay?: number | null): Promise<Array<Person>>;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const generatePerson = (): Person => ({
  id: Faker.datatype.uuid(),
  first_name: Faker.name.firstName(),
  last_name: Faker.name.lastName(),
  age: Faker.datatype.number(100),
});

const getPeopleList = (count: number) => {
  const list: Array<Person> = [];
  for (let i = 0; i < count; i++) {
    list.push(generatePerson());
  }
  return list;
};

class MockAPI extends DataSource implements MockAPIType {
  constructor() {
    super();
  }

  async getPeople(count: number, delay?: number | null) {
    await sleep(delay || 0);
    return getPeopleList(count);
  }
}

export default MockAPI;
