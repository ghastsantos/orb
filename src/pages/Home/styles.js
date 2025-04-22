import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
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
            'content content'
    }
`;

export const Brand = styled.div`
    grid-area: brand;
    padding-left: 40px;
    display: flex;
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
    padding-top: 64px;
    text-align: center;
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

export const LogoutButton = styled.button`
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
    color: ${({ theme }) => theme.COLORS.TEXT};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
    }

    svg {
        margin-right: 8px;
    }
`;


export const Content = styled.div`
    grid-area: content;
    padding: 0 64px;
    overflow-y: auto;
    transition: padding-bottom 0.3s ease-in-out;

    &.menu-open {
        padding-bottom: 8rem;
    }
`;
