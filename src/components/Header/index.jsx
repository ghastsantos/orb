import { Container, Profile, Logout } from './styles';
import { FiLogOut } from 'react-icons/fi';
import defaultAvatar from '../../assets/fotoperfil.png';

export function Header({ className, onNavigate, usuario, imgVersion }) {
    return (
        <Container className={className}>
            <Profile>
                <img
                    src={
                        usuario?.id
                            ? `http://localhost:3000/api/usuario/imagem/${usuario.id}?t=${imgVersion}`
                            : defaultAvatar
                    }
                    alt="Foto do usuário"
                    onClick={() => onNavigate('profile')}
                    onError={e => {
                        e.target.onerror = null;
                        e.target.src = defaultAvatar;
                    }}
                />
                <div>
                    <span>Bem-vindo</span>
                    <strong>{usuario?.nome || "Usuário"}</strong>
                </div>
                <Logout className={className} onClick={() => onNavigate('login')}>
                    <FiLogOut />
                </Logout>
            </Profile>
        </Container>
    );
}