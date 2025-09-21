// This file contains intentional linting errors to test PR comment functionality

import React from 'react'

// Missing return type annotation
const TestComponent = () => {
  // Unused variable
  const unusedVar = 'test'
  
  // Missing semicolon
  const anotherVar = 'hello'
  
  // Inconsistent quotes
  const message = "This should use single quotes"
  
  return (
    <div>
      <h1>Test Component</h1>
      <p>{message}</p>
    </div>
  )
}

// Export the component
export default TestComponent;
