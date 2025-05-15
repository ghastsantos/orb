import React from 'react';
import { Container } from './styles';

export function Select({ icon: Icon, options, placeholder, ...rest }) {

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <select {...rest}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.nome}
          </option>
        ))}
      </select>
    </Container>
  );
}