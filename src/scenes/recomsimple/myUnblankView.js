import React from 'react';

export default function MyUnblankView(
    {
        title, message,
        toggleVisibility, isVisible
    }
) {
  return (
    <div>
      <h1>{title}</h1>
      { isVisible ? <p>I can see</p> : <p>Nope</p> }
      <p>{message}</p>
      <button onClick={toggleVisibility}>Click</button>
    </div>
  );
}
