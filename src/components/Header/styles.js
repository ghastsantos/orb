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

<<<<<<< Updated upstream
    @media (max-width: 768px) {
=======
    @media (max-width: 767px) {
>>>>>>> Stashed changes
        height: 80px;
        padding: 0 20px;
        width: 250px;

        &.menu-open {
            width: 250px;
            margin-left: -96px;
        }

    }
`;


export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto; 

    > img {
        height: 56px;
        width: 56px;
        border-radius: 50%;
        user-select: none;
        cursor: pointer;

<<<<<<< Updated upstream
        @media (max-width: 768px) {
=======
        @media (max-width: 767px) {
>>>>>>> Stashed changes
            height: 40px; /* Reduz o tamanho da imagem */
            width: 40px;
        }
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;

        span {
            font-size: 14px;
            color: ${({ theme }) => theme.COLORS.GRAY_100};
            user-select: none;

<<<<<<< Updated upstream
            @media (max-width: 768px) {
=======
            @media (max-width: 767px) {
>>>>>>> Stashed changes
                font-size: 12px; /* Reduz o tamanho do texto */
            }
        }

        strong {
            font-size: 18px;
            color: ${({ theme }) => theme.COLORS.WHITE};
            user-select: none;

<<<<<<< Updated upstream
            @media (max-width: 768px) {
=======
            @media (max-width: 767px) {
>>>>>>> Stashed changes
                font-size: 14px; 
            }
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

    &:hover {
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }
`;