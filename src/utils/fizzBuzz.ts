export const Message = {
  FIZZ: 'Fizz',
  BUZZ: 'Buzz',
  FIZZBUZZ: 'FizzBuzz',
};

const divisible = (x: number, y: number) => x % y === 0;

export const fizzBuzz = (n: number) => {
  if (typeof n !== 'number') return '';

  if (divisible(n, 15)) {
    return Message.FIZZBUZZ;
  } else if (divisible(n, 3)) {
    return Message.FIZZ;
  } else if (divisible(n, 5)) {
    return Message.BUZZ;
  } else {
    return n.toString();
  }
};
