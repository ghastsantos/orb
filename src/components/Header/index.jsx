import { Container, Profile, Logout } from './styles';
import { FiLogOut } from "react-icons/fi";

export function Header({className, onNavigate, usuario }){
    return(
        <Container className={className}>
            <Profile>
                <img
                    src={usuario?.id ? `http://localhost:3000/api/usuario/imagem/${usuario.id}` : ''}
                     alt="Foto do usuário"
                     onClick={() => onNavigate('profile')}
                    />
                <div>
                    <span>Bem-vindo</span>
                    <strong>{usuario?.nome||"usuario"}</strong>
                </div>
                <Logout onClick={() => onNavigate('login')}>
                    <FiLogOut />
                </Logout>
            </Profile>
        </Container>
    )
}