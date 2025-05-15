import React, { useState } from 'react';
import { Container } from './styles';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export function Input({ icon: Icon, type, ...rest }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInvalid = (e) => {
    e.preventDefault();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const inputType = type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <Container>
      {Icon && <Icon size={20} />}
      <input
        onInvalid={handleInvalid}
        type={inputType}
        {...rest}
      />
      {type === 'password' && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          {isPasswordVisible ? (
            <FiEyeOff size={20} color="white" />
          ) : (
            <FiEye size={20} color="white" />
          )}
        </button>
      )}
    </Container>
  );
}