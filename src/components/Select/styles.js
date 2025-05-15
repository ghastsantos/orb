import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    color: ${({ theme }) => theme.COLORS.GRAY_300};
    margin-bottom: 8px;
    border-radius: 10px;

    > svg{
            margin-left: 16px;
    }

    select {
        height: 56px;
        width: 100%;
        padding: 12px;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
        background: transparent;
        border: 0;

        @media (max-width: 768px) {
            font-size: 14px;
        }
        
        option {
            color: ${({ theme }) => theme.COLORS.GRAY_300}; 
        }
    }
`;