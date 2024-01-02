import { CityObjectToStringPipe } from './city-object-to-string.pipe';

describe('CityObjectToStringPipe', () => {
  it('create an instance', () => {
    const pipe = new CityObjectToStringPipe();
    expect(pipe).toBeTruthy();
  });
});
