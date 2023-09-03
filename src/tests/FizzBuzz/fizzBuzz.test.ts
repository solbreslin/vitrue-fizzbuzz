import { describe, expect, it } from 'vitest';
import { fizzBuzz, Message } from '@/utils/fizzBuzz.ts';

describe('FizzBuzz.vue', () => {
  it('function exists', () => {
    expect(typeof fizzBuzz).toEqual('function');
  });

  it('returns the input as a string if the input is not divisible by 3, 5 or 15', () => {
    const input = 4;
    const output = fizzBuzz(input);

    expect(output).toEqual(input.toString());
  });

  it(`returns ${Message.FIZZ} if input is divisible by 3`, () => {
    const input = 9;
    const output = fizzBuzz(input);

    expect(output).toEqual(Message.FIZZ);
  });

  it(`returns ${Message.BUZZ} if input is divisible by 5`, () => {
    const input = 10;
    const output = fizzBuzz(input);

    expect(output).toEqual(Message.BUZZ);
  });

  it(`returns ${Message.FIZZBUZZ} if input is divisible by 15`, () => {
    const input = 45;
    const output = fizzBuzz(input);

    expect(output).toEqual(Message.FIZZBUZZ);
  });

  // Number inputs allow users to type in numbers larger than the 'max' attribute on the element
  it('handles very large numbers', () => {
    const input = 1e6 + 15;
    const output = fizzBuzz(input);

    expect(output).toEqual(Message.BUZZ);
  });

  it('handles decimal numbers', () => {
    const input = 15.1;
    const output = fizzBuzz(input);

    expect(output).toEqual((15.1).toString());
  });

  // Number inputs allow users to type in numbers less than the 'min' attribute on the element
  it('handles negative numbers', () => {
    const input = -15;
    const output = fizzBuzz(input);

    expect(output).toEqual(Message.FIZZBUZZ);
  });

  it('handles invalid input', () => {
    const input = 'test';
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const output = fizzBuzz(input);

    expect(output).toEqual('');
  });

  it('handles empty input', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const output = fizzBuzz();
    expect(output).toEqual('');
  });
});
