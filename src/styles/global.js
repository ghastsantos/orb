import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    input[type="password"]::-ms-reveal, /* Para navegadores baseados no Edge */
    input[type="password"]::-ms-clear,  /* Para navegadores baseados no Edge */
    input[type="password"]::-webkit-clear-button, /* Para navegadores baseados no WebKit */
    input[type="password"]::-webkit-inner-spin-button, /* Para navegadores baseados no WebKit */
    input[type="password"]::-webkit-outer-spin-button, /* Para navegadores baseados no WebKit */
    input[type="password"]::-webkit-textfield-decoration-container {
    display: none; /* Oculta o botão nativo */
    }

    body {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};
        -webkit-font-smoothing: antialiased;
    }

    body, input, button, textarea, select {
        font-family: 'Roboto Slab', serif;
        font-size: 16px;
        outline: none;
    }

    a {
        text-decoration: none;
    }

    button, a {
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover {
        filter: brightness(0.9);
    }

    select {
        width: 100%;
        padding: 16px;
        border-radius: 10px;
        border: none;
        margin-bottom: 8px;

        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }

    select option {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};
    }
`;