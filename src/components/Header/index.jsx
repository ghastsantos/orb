import { Container, Profile, Logout } from './styles';
import { FiLogOut } from 'react-icons/fi';

export function Header({ className, onNavigate, usuario, imgVersion }) {
    return (
        <Container className={className}>
            <Profile>
                <img
                    src={
                        usuario?.id
                            ? `http://localhost:3000/api/usuario/imagem/${usuario.id}?t=${imgVersion}`
                            : ''
                    }
                    alt="Foto do usuário"
                    onClick={() => onNavigate('profile')}
                    onError={e => { e.target.src = ''; }} // Limpa a imagem se não existir
                />
                <div>
                    <span>Bem-vindo</span>
                    <strong>{usuario?.nome || "Usuário"}</strong>
                </div>
                <Logout onClick={() => onNavigate('login')}>
                    <FiLogOut />
                </Logout>
            </Profile>
        </Container>
    );
}