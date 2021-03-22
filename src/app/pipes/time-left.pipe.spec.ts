import { TimeLeftPipe } from './time-left.pipe';

describe('TimeLeftPipe', () => {
  const pipe = new TimeLeftPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms 10 to 00:00:10', () => {
    expect(pipe.transform(10)).toBe('00:00:10');
  });
  it('transforms `0` to 00:00:00', () => {
    expect(pipe.transform('0')).toBe('00:00:00');
  });
});
