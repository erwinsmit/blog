import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export const DocSearchButton = React.forwardRef(
  ({ translations = {}, ...props }, ref) => {
    const { buttonText = 'Search', buttonAriaLabel = 'Search' } = translations;

    return (
      <button
        type="button"
        className="bg-white p-2 border-2 border-indigo-600"
        aria-label={buttonAriaLabel}
        {...props}
        ref={ref}
      >
        <MagnifyingGlassIcon className="h-6 w-6  text-blue-400" />
      </button>
    );
  }
);
