import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    transition: all 0.3s ease-in-out;

    &.menu-open {
        grid-template-columns: 250px auto;
        grid-template-areas:
            'brand header'
            'menu content';

        @media (max-width: 767px) {
            grid-template-areas:
            'brand header'
            'menu menu';
        }
    }

    &.menu-closed {
        grid-template-columns: auto;
        grid-template-rows: 105px auto 0px;
        grid-template-areas:
            'brand header'
            'content content';
    }
`;

export const Brand = styled.div`
    padding-left: 40px;
    height: 105px;
    display: flex;
    z-index: 100;
    justify-content: flex-start;
    gap: 10px;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

    @media (max-width: 767px) {
            height: 80px; 
        }

    > h1 {
        font-size: 24px;
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }

    > img {
        user-select: none;
    }

    > svg {
        cursor: pointer;
        transition: color 0.3s ease-in-out;

        &:hover {
            color: ${({ theme }) => theme.COLORS.ORANGE}; 
        }
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;

    img {
        height: 100px;
        user-select: none;

        @media (max-width: 767px) {
            height: 70px; 
        }
    }
`;

export const Menu = styled.ul`
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    padding-top: 136px;
    text-align: center;
    position: fixed;
    height: 510px;
    width: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

    &.menu-open {
        width: 250px;
        opacity: 1;
        visibility: visible;
        height: 100vh;

        @media (max-width: 767px) {
            width: 100%; 
            height: calc(100vh - 80px);
            position: absolute; 
            top: 80px; 
            left: 0;
        }
    }

    > li {
        margin-bottom: 24px;

        @media (max-width: 767px) {
            margin-bottom: 16px; 
        }
    }
`;

export const Content = styled.div`
    grid-area: content;
    padding: 0 64px;
    position: relative;
    top: 10%;
    right: 5%;

    @media (max-width: 767px) {
        right: 43%;
        top: 15%;
        width: 330px;

        &.menu-open {
            display: none;
        }
    }
`;

export const FilterBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    > input {
        padding: 6px 12px;
        border-radius: 4px;
        border: 1px solid #ccc;
        width: 200px;
    }

    > svg {
        position: absolute;
        right: 8px;
        top: 8px;
        color: #888;
    }
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 767px) {
    display: block;
  }
`;

export const NewsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;

    @media (max-width: 767px) {
        grid-template-columns: 1fr; 
        width: 243px;
    }
`;

export const NewsCard = styled.div`
    background: #fff;
    padding: 16px;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: translateY(-4px);
    }

    > img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 6px;
    }

    > h3 {
        font-size: 18px;
        margin-top: 8px;
    }

    > span {
        font-size: 12px;
        color: #888;
    }

    > p {
        margin-top: 8px;
        max-height: 48px; /* Limita a altura do texto */
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Limita a 2 linhas */
        -webkit-box-orient: vertical;
    }
`;


