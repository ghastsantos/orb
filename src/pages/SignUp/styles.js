import styled from 'styled-components';
import backgroundImg from '../../assets/banner3.png';

export const Container = styled.div`
    display: flex;
    align-items: stretch;
`;

export const Form = styled.form`
    padding: 0 136px;    
    height: 164vh;

    @media (max-width: 768px) {
        padding: 0 70px;   
    }
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${({ theme }) => theme.COLORS.BACKGROUND_900};

    > h1{
        font-size: 48px;
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }

    > h2{
        font-size: 24px;
        margin: 48px 0;
    }

    > p{
        font-size: 18px;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    > a{
        margin-top: 36px;
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${backgroundImg}) no-repeat center center;
    background-size: cover;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;

    img {
        height: 136px;
        user-select: none;
    }
`;