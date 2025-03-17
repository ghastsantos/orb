import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: grid;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    transition: all 0.3s;
    overflow: hidden;

    &.menu-open {
        grid-template-columns: 250px auto;
        grid-template-rows: 105px 128px auto 64px;
        grid-template-areas:
            'brand header'
            'menu search'
            'menu content'
            'newNote content';
    }

    &.menu-closed {
        grid-template-columns: auto;
        grid-template-rows: 105px auto 64px;
        grid-template-areas:
            'brand header'
            'search search'
            'content content'
            'newNote newNote';
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

    > h1 {
        font-size: 24px;
        color: ${({ theme }) => theme.COLORS.ORANGE};
    }
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;

    img {
        height: 100px;
    }
`;

export const Menu = styled.ul`
    grid-area: menu;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    padding-top: 64px;
    text-align: center;
    height: 510px;

    > li {
        margin-bottom: 24px;
    }
`;

export const Search = styled.div`
    grid-area: search;
    padding: 64px 64px 0;
`;

export const Content = styled.div`
    grid-area: content;
    padding: 0 64px;
`;

export const NewNote = styled.button`
    grid-area: newNote;
    background-color: ${({ theme }) => theme.COLORS.ORANGE};
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        margin-right: 8px;
    }
`;