import React from 'react';

export default function XIcon({ className = 'h-6 w-6 fill-black-primary' }) {
  return (
    <svg className={ className } viewBox="0 0 24 24">
      <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
    </svg>
  );
}
