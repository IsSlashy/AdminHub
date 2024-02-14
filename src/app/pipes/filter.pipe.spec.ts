import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return emtpy array if not items', () => {
    expect(pipe.transform([], '')).toEqual([]);
  });

  it('should return items if not search term', () => {
    expect(pipe.transform(['toto', 'titi'], '')).toEqual(['toto', 'titi']);
  });

  it('should filter in item', () => {
    expect(pipe.transform(['toto', 'titi'], 'toto')).toEqual(['toto']);
  });
});
