import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    .slick-slider {
        margin: 0 auto;
    }

    .slick-dots {
        bottom: -25px;
    }

    .slick-prev,
    .slick-next {
        z-index: 1;
        color: ${({ theme }) => theme.COLORS.TEXT};
    }
`;

export const Card = styled.div`
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }

    h1 {
        font-size: 18px;
        margin: 16px;
        color: ${({ theme }) => theme.COLORS.TEXT};
    }

    footer {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 16px;
    }
`;

export const Image = styled.div`
    width: 100%;
    height: 180px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;