import styled from 'styled-components';

export const Container = styled.header`
    grid-area: header;

    height: 105px;
    width: 100%;

    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
    gap: 40px;

    display: flex;
    justify-content: space-between; 

    padding: 0 40px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
`;


export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto; 

    > img {
        height: 56px;
        width: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.GRAY_100};
        }

        strong {
            font-size: 18px;
            color: ${({ theme }) => theme.COLORS.WHITE};
        }
    }
`;

export const Logout = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    margin-left: 32px;
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.GRAY_100};
`;