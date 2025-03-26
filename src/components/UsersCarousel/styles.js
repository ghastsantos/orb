import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-top: 32px;
`;

export const CarouselWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
    transition: transform 0.5s ease-in-out;
`;

export const Card = styled.div`
    flex: 0 0 calc(33% - 16px);
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 16px;

    h1 {
        font-size: 16px;
        margin-top: 8px;
        color: ${({ theme }) => theme.COLORS.TEXT};
    }

    footer {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        margin-top: 8px;
    }

    @media (max-width: 768px) {
        flex: 0 0 calc(33.33% - 16px);
    }

    @media (max-width: 480px) {
        flex: 0 0 calc(50% - 16px);
    }
`;

export const Image = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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