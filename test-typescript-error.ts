// This file contains intentional TypeScript errors to test PR comments

interface User {
  name: string;
  age: number;
}

// Type error: missing required properties
const user: User = {
  // name: 'John',  // Missing required property
  // age: 25        // Missing required property
};

// Type error: wrong type
const number: string = 123;

// Type error: undefined property
const obj = {};
console.log(obj.nonExistentProperty);

export { user };
