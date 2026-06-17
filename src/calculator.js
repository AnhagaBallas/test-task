export function calculate(expression) {
  if (typeof expression !== 'string' || expression.trim() === '') {
    throw new Error('Invalid expression');
  }

  const validCharsRegex = /^[\d\s+\-*/.]+$/;
  if (!validCharsRegex.test(expression)) {
    throw new Error('Invalid expression');
  }

  const tokenPattern = /\d+(\.\d+)?|[+\-*/]/g;
  const tokens = expression.match(tokenPattern);

  if (!tokens) {
    throw new Error('Invalid expression');
  }

  if (tokens.length % 2 === 0) {
    throw new Error('Invalid expression');
  }

  for (let i = 0; i < tokens.length; i++) {
    if (i % 2 === 0) {
      if (isNaN(Number(tokens[i]))) {
        throw new Error('Invalid expression');
      }
    } else {
      if (!['+', '-', '*', '/'].includes(tokens[i])) {
        throw new Error('Invalid expression');
      }
    }
  }

  const numbers = tokens
    .filter((_, index) => index % 2 === 0)
    .map(Number);
  
  const operators = tokens.filter((_, index) => index % 2 === 1);

  let nums = [...numbers];
  let ops = [...operators];

  let i = 0;
  while (i < ops.length) {
    if (ops[i] === '*' || ops[i] === '/') {
      const left = nums[i];
      const right = nums[i + 1];
      let result;

      if (ops[i] === '*') {
        result = left * right;
      } else {
        if (right === 0) {
          throw new Error('Division by zero');
        }
        result = left / right;
      }

      nums.splice(i, 2, result);
      ops.splice(i, 1);
    } else {
      i++;
    }
  }

  let result = nums[0];
  for (let j = 0; j < ops.length; j++) {
    if (ops[j] === '+') {
      result += nums[j + 1];
    } else if (ops[j] === '-') {
      result -= nums[j + 1];
    }
  }

  return result;
}