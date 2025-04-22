import React from 'react';
import { Container } from './styles';

export function ButtonText({ title, icon: Icon, isActive = false, onClick }) {
    return (
        <Container
            className={isActive ? 'active' : ''}
            onClick={onClick} // Adiciona o evento onClick
        >
            {Icon && <Icon size={20} />} {/* Renderiza o ícone se ele for passado como prop */}
            <span>{title}</span>
        </Container>
    );
}