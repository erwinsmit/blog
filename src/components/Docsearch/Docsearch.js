import React, { useCallback, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { DocSearchButton } from './DocSearchButton';
import { DocSearchModal } from '@docsearch/react';
import { useDocSearchKeyboardEvents } from '@docsearch/react';

export function DocSearch(props) {
  const searchButtonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(
    props.initialQuery || undefined
  );

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onInput = useCallback(event => {
    setIsOpen(true);
    setInitialQuery(event.key);
  }, []);

  useDocSearchKeyboardEvents({
    isOpen,
    onOpen,
    onClose,
    onInput,
    searchButtonRef,
  });

  return (
    <>
      <DocSearchButton
        ref={searchButtonRef}
        translations={
          props.translations ? props.translations.button : undefined
        }
        onClick={onOpen}
      />

      {isOpen &&
        createPortal(
          <DocSearchModal
            {...props}
            initialScrollY={window.scrollY}
            initialQuery={initialQuery}
            translations={
              props.translations ? props.translations.modal : undefined
            }
            onClose={onClose}
          />,
          document.body
        )}
    </>
  );
}
