import React from 'react';
import { Container } from './styles';

export function ButtonText({ title, icon: Icon, isActive = false }) {
    return (
        <Container className={isActive ? 'active' : ''}>
            {Icon && <Icon size={20} />} {/* Renderize o ícone se ele for passado como prop */}
            <span>{title}</span>
        </Container>
    );
}