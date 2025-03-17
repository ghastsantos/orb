import styled from 'styled-components';

export const Container = styled.button`
    background: none;
    color: ${({ theme, isActive }) => isActive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100 };
    border: none;
    font-size: 16px;
    gap: 8px;

    > svg{
        margin-bottom: -2px;
    }

    &.active {
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    &:hover {
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }
`;