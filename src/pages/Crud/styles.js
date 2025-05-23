import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    padding: 20px;
    box-sizing: border-box;
`;

export const Form = styled.form`
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    > input, select {
        width: 100%;
        height: 40px;
        padding: 8px;
        border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
        border-radius: 5px;
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        color: ${({ theme }) => theme.COLORS.WHITE};
        font-size: 14px;
    }

    > button {
        width: 100%;
        height: 40px;
        background-color: ${({ theme }) => theme.COLORS.ORANGE};
        color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
        border: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: ${({ theme }) => theme.COLORS.GRAY_100};
        }
    }
`;

export const Table = styled.table`
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
    border-collapse: collapse;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    th, td {
        padding: 12px;
        text-align: left;
        border: 1px solid ${({ theme }) => theme.COLORS.GRAY_100};
        color: ${({ theme }) => theme.COLORS.WHITE};
    }

    th {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
        font-weight: bold;
    }

    td {
        background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }

    button {
        padding: 6px 12px;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        cursor: pointer;
        transition: background-color 0.3s;

        &.edit {
            background-color: ${({ theme }) => theme.COLORS.ORANGE};
            color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

            &:hover {
                background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
                color: ${({ theme }) => theme.COLORS.WHITE};
            }
        }

        &.delete {
            background-color: ${({ theme }) => theme.COLORS.ORANGE};
            color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

            &:hover {
                background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
                color: ${({ theme }) => theme.COLORS.WHITE};
            }
        }
    }

    @media (max-width: 768px) {
        th, td {
            font-size: 10px;
            padding: 8px;
        }

        button {
            font-size: 8px;
            padding: 4px 8px;
        }
    }

    @media (max-width: 480px) {
        th, td {
            font-size: 8px;
            padding: 4px;
        }

        button {
            font-size: 6px;
            padding: 3px 6px;
        }

        overflow-x: auto;
    }
`;

export const BackButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: ${({ theme }) => theme.COLORS.GRAY_100};
    color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    border: none;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ theme }) => theme.COLORS.ORANGE};
    }
`;