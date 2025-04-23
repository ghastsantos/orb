import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: grid;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    transition: all 0.3s ease-in-out;
`;