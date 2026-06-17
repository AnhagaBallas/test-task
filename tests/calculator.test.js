import { describe, it, expect } from 'vitest';
import { calculate } from '../src/calculator.js';

describe('String Calculator — базовые операции', () => {
  it('складывает два числа', () => {
    expect(calculate('2 + 3')).toBe(5);
  });

  it('вычитает два числа', () => {
    expect(calculate('10 - 4')).toBe(6);
  });

  it('умножает два числа', () => {
    expect(calculate('3 * 4')).toBe(12);
  });

  it('делит два числа', () => {
    expect(calculate('15 / 3')).toBe(5);
  });
});

describe('String Calculator — приоритет операций', () => {
  it('умножение выполняется раньше сложения', () => {
    expect(calculate('2 + 3 * 4')).toBe(14);
  });

  it('деление выполняется раньше вычитания', () => {
    expect(calculate('10 / 2 - 3')).toBe(2);
  });

  it('несколько операций с разным приоритетом', () => {
    expect(calculate('1 + 2 * 3 + 4')).toBe(11);
  });

  it('только умножение и деление слева направо', () => {
    expect(calculate('8 / 2 * 4')).toBe(16);
  });

  it('сложная комбинация операций', () => {
    expect(calculate('2 + 3 * 4 - 10 / 2')).toBe(9);
    // 2 + 12 - 5 = 9
  });
});

describe('String Calculator — дробные числа', () => {
  it('складывает дробные числа', () => {
    expect(calculate('1.5 + 2.5')).toBe(4);
  });

  it('умножает дробные числа', () => {
    expect(calculate('2.5 * 4')).toBe(10);
  });

  it('делит дробные числа', () => {
    expect(calculate('7.5 / 2.5')).toBe(3);
  });
});

describe('String Calculator — обработка пробелов', () => {
  it('работает без пробелов', () => {
    expect(calculate('2+3')).toBe(5);
  });

  it('работает с несколькими пробелами', () => {
    expect(calculate('2  +  3')).toBe(5);
  });

  it('работает с пробелами вокруг всех операторов', () => {
    expect(calculate(' 2 + 3 * 4 ')).toBe(14);
  });
});

describe('String Calculator — обработка ошибок', () => {
  it('бросает ошибку при делении на ноль', () => {
    expect(() => calculate('10 / 0')).toThrow('Division by zero');
  });

  it('бросает ошибку при делении на ноль в сложном выражении', () => {
    expect(() => calculate('2 + 10 / 0')).toThrow('Division by zero');
  });

  it('бросает ошибку при некорректном вводе (буквы)', () => {
    expect(() => calculate('abc')).toThrow('Invalid expression');
  });

  it('бросает ошибку при пустой строке', () => {
    expect(() => calculate('')).toThrow('Invalid expression');
  });

  it('бросает ошибку при некорректном выражении (только оператор)', () => {
    expect(() => calculate('+')).toThrow('Invalid expression');
  });

  it('бросает ошибку при некорректном выражении (два оператора подряд)', () => {
    expect(() => calculate('2 + + 3')).toThrow('Invalid expression');
  });

  it('бросает ошибку при выражении, начинающемся с оператора', () => {
    expect(() => calculate('+ 2')).toThrow('Invalid expression');
  });

  it('бросает ошибку при выражении, заканчивающемся оператором', () => {
    expect(() => calculate('2 +')).toThrow('Invalid expression');
  });
});