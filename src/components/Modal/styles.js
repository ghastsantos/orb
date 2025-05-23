import styled from 'styled-components';

export const Overlay = styled.div`
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalBox = styled.div`
    background: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    color: ${({ theme }) => theme.COLORS.WHITE};
    padding: 32px 24px 24px 24px;
    border-radius: 12px;
    max-width: 500px;
    width: 90vw;
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    word-break: break-word;
    white-space: pre-line; 
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-size: 24px;
    cursor: pointer;
    z-index: 2;
`;