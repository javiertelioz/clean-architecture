import SayHello from '../../../../src/application/use_cases/hello/SayHello';

describe('Say Hello', () => {
  test('Should resolve with "Hello world!" when name is not defined (undefined or null)', () => {
    // when
    const result = SayHello();

    // then
    expect(result).toBe('Hello world!');
  });

  test('Should resolve with "Hello John!" when name is provided', () => {
    // given
    const name = 'John';

    // when
    const result = SayHello(name);

    // then
    expect(result).toBe('Hello John!');
  });
});
