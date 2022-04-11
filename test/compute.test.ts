import { analyze } from "../src/analyze";
import { compute } from "../src/compute";

const fixtures = {
  // '1-2': [[1, '-', 2], -1],
  // '5%2': [[5, '%', 2], 1],
  '': [
    [],
    0
  ],
  '+': [
    ['+'],
    0
  ],
  '1': [
    [1],
    1
  ],
  '1+2': [
    [1, '+', 2],
    3
  ],
  '1 - 2': [
    [1, '-', 2],
    -1
  ],
  '1 + 2': [
    [1, '+', 2],
    3
  ],
  '-1 + -2': [
    [-1, '+', -2],
    -3
  ],
  '5 % 2': [
    [5, '%', 2],
    1
  ],
  '1 * 2': [
    [1, '*', 2],
    2
  ],
  '12 + (12 -12)': [
    [12, '+', [12, '-', 12]],
    12
  ],
  '(12) + (12 + 12)': [
    [[12], '+', [12, '+', 12]],
    36
  ],
  '12 + (12 + 12)': [
    [12, '+', [12, '+', 12]],
    36
  ],
  '13 + (14 + 15) + (16 + 17)': [
    [13, '+', [14, '+', 15], '+', [16, '+', 17]],
    75
  ],
  '1 + round(1 + 1.2)': [
    [1, '+', ['round', [1, '+', 1.2]]],
    3
  ],
  'round(1 + 1.2)': [
    [['round', [1, '+', 1.2]]],
    2
  ],
  'min(1, 2)': [
    [['min', [1], [2]]],
    1
  ],
  'max(1, 2 + 3)': [
    [['max', [1], [2, '+', 3]]],
    5
  ]
};

function getFixtureByIndex(index: number) {
  return Object.keys(fixtures).map((str) => [str, fixtures[str][index]]);
}

describe('analyze', () => {
  it.each(getFixtureByIndex(0))('processes %j', (str, expected) => {
    expect(analyze(str)).toEqual(expected);
  });
});

describe('compute', () => {
  it.each(getFixtureByIndex(1))('calculates %j (= %s)', (str, expected) => {
    expect(compute(str)).toEqual(expected);
  });
});
