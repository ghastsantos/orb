import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
`;

export const CarouselWrapper = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
    width: 100%;
`;

export const Card = styled.div`
    min-width: 100%; 
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

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

    @media (max-width: 768px) {
        width: 100%; 
        margin: 0 auto; 
    }

    @media (max-width: 480px) {
        width: 100%; 
    }
`;

export const Image = styled.div`
    width: 100%;
    height: 300px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media (max-width: 768px) {
        height: 200px; 
    }

    @media (max-width: 480px) {
        height: 150px; 
    }
`;

export const Controls = styled.div`
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
    pointer-events: none;

    button {
        pointer-events: all;
        background: rgba(0, 0, 0, 0.5);
        border: none;
        color: white;
        font-size: 18px;
        padding: 8px 16px;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.3s;

        &:hover {
            background: rgba(0, 0, 0, 0.8);
        }
    }
`;