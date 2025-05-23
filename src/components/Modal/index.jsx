import React from 'react';
import { Overlay, ModalBox, CloseButton } from './styles';
import { FiX } from 'react-icons/fi';

export function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <Overlay>
            <ModalBox>
                <CloseButton onClick={onClose}>
                    <FiX size={24} />
                </CloseButton>
                {children}
            </ModalBox>
        </Overlay>
    );
}