export type Sc = (string | number | Sc)[];

const expReg = /(([a-z]*)\([^\)]+\)|[-]{0,1}[0-9.]+|[^0-9\s]{1,1}|[^\s]+)/ig;

export const analyze = (str: string): Sc => {
  let matches = str.match(expReg);
  if (!matches) return [];
  if (matches.length === 2 && matches[1].startsWith('-')) {
    matches = [matches[0], '-', matches[1].slice(1)];
  }
  return matches.map(match => {
    if (!Number.isNaN(Number(match)))
      return Number(match);

    const item = match.trim();
    if (item.length === 1)
      return item;

    const openingIndex = item.indexOf('(');
    if (openingIndex === 0)
      return analyze(item.slice(1, -1));

    const functionName = item.slice(0, openingIndex);
    const subExpressions = item.slice(openingIndex + 1, -1).split(',').map(s => s.trim());
    return [
      functionName,
      ...subExpressions.map(s => analyze(s))
    ];
  });
};
