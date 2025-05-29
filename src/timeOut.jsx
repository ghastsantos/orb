import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AutoLogout = () => {
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  const logout = () => {
    fetch('/logout', { method: 'POST', credentials: 'include' }) // sua rota de logout no backend
      .then(() => navigate('/login'));
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(logout, 10 * 60 * 1000); // 10 minutos
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click', 'scroll'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    resetTimer(); // inicia o timer

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return null; // Componente invisível
};

export default AutoLogout;

