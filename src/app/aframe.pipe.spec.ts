import { AframePipe } from './aframe.pipe';

describe('AframePipe', () => {
  it('transform a simple object value into string', () => {
    const pipe = new AframePipe();
    expect(pipe.transform({ color: 'red' })).toBe('color: red');
  });

  it('transform object with several properties correctly', () => {
    const pipe = new AframePipe();
    expect(pipe.transform({ color: 'red', emissive: 'green' }))
      .toBe('color: red; emissive: green');
  });

  it('transform boolean value to string "true" and "false" strings', () => {
    const pipe = new AframePipe();
    expect(pipe.transform({ visible: true, hidden: false }))
      .toBe('visible: true; hidden: false');
  });

  it('transform boolean value to string "true" and "false" strings', () => {
    const pipe = new AframePipe();
    expect(pipe.transform({ visible: true, hidden: false }))
      .toBe('visible: true; hidden: false');
  });

  it('should correctly transform numeric properties', () => {
    const pipe = new AframePipe();
    expect(pipe.transform({ roughness: 1.0, metalness: 0.2 }))
      .toBe('roughness: 1; metalness: 0.2');
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
