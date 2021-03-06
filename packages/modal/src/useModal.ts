/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import { useState } from 'react';
import { useUIDSeed } from 'react-uid';
import { composeEventHandlers, KEY_CODES } from '@zendeskgarden/container-utilities';
import { useFocusJail } from '@zendeskgarden/container-focusjail';

export interface IUseModalProps {
  /** A callback when a close action has been completed */
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  /** A ref pointing to a DOM element which contains the modal content */
  modalRef: React.RefObject<HTMLElement>;
  /** An ID that is applied to modal elements */
  id?: string;
  /** Determines if the modal's focus jail container should focus on mount */
  focusOnMount?: boolean;
  /** Determines whether to return keyboard focus to the element that triggered the modal */
  restoreFocus?: boolean;
  /** The environment where the focus jail is rendered */
  environment?: Document;
}

export interface IUseModalReturnValue {
  getBackdropProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getModalProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getTitleProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getContentProps: <T>(options?: T) => T & React.HTMLProps<any>;
  getCloseProps: <T>(options?: T) => T & React.HTMLProps<any>;
  closeModal?: (event: any) => void;
}

export function useModal(
  {
    onClose,
    modalRef,
    id: _id,
    focusOnMount,
    restoreFocus,
    environment
  }: IUseModalProps = {} as any
): IUseModalReturnValue {
  const seed = useUIDSeed();
  const [idPrefix] = useState(_id || seed(`modal_${PACKAGE_VERSION}`));
  const titleId = `${idPrefix}--title`;
  const contentId = `${idPrefix}--content`;

  const closeModal = (event: KeyboardEvent | MouseEvent) => {
    onClose && onClose(event);
  };

  const getBackdropProps = ({ onClick, ...other } = {} as any) => {
    return {
      onClick: composeEventHandlers(onClick, (event: MouseEvent) => {
        closeModal(event);
      }),
      'data-garden-container-id': 'containers.modal',
      'data-garden-container-version': PACKAGE_VERSION,
      ...other
    };
  };

  const getModalProps = ({ role = 'dialog', onClick, onKeyDown, ...other } = {} as any) => {
    return {
      role,
      tabIndex: -1,
      'aria-modal': true,
      'aria-labelledby': titleId,
      'aria-describedby': contentId,
      onClick: composeEventHandlers(onClick, (event: MouseEvent) => {
        /**
         * Don't want to trigger the backdrop close event
         * if click originates within the Modal
         */
        event.stopPropagation();
      }),
      onKeyDown: composeEventHandlers(onKeyDown, (event: KeyboardEvent) => {
        if (event.keyCode === KEY_CODES.ESCAPE) {
          closeModal(event);
        }
      }),
      ...other
    };
  };

  const getTitleProps = ({ id = titleId, ...other } = {} as any) => {
    return {
      id,
      ...other
    };
  };

  const getContentProps = ({ id = contentId, ...other } = {} as any) => {
    return {
      id,
      ...other
    };
  };

  const getCloseProps = ({ onClick, ...other } = {} as any) => {
    return {
      'aria-label': 'Close modal',
      onClick: composeEventHandlers(onClick, (event: MouseEvent) => {
        closeModal(event);
      }),
      ...other
    };
  };

  const { getContainerProps } = useFocusJail({
    containerRef: modalRef,
    focusOnMount,
    restoreFocus,
    environment
  });

  return {
    getBackdropProps,
    getModalProps: props => getContainerProps(getModalProps(props)),
    getTitleProps,
    getContentProps,
    getCloseProps,
    closeModal
  };
}
