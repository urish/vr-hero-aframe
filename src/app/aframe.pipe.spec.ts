import { AframePipe } from './aframe.pipe';

describe('AframePipe', () => {
  it('given an object, should return a new object with toString() method that returns the original object', () => {
    const pipe = new AframePipe();
    expect(pipe.transform({ color: 'red' }).toString())
      .toEqual({ color: 'red' });
  });

  it('should return a given string unmodified', () => {
    const pipe = new AframePipe();
    expect(pipe.transform('primitive: box; width: 3'))
      .toBe('primitive: box; width: 3');
  });

  it('should return null if given null', () => {
    const pipe = new AframePipe();
    expect(pipe.transform(null))
      .toBe(null);
  });
});
