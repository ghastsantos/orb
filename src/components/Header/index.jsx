import { Container, Profile, Logout } from './styles';
import { RiShutDownLine } from 'react-icons/ri';

export function Header(){
    return(
        <Container>
            <Profile>
                <img src="https://github.com/ghastsantos.png" alt="foto do usuário"/>

                <div>
                    <span>Bem-vindo</span>
                    <strong>Gastão</strong>
                </div>
                <Logout>
                    <RiShutDownLine />
                </Logout>
            </Profile>
        </Container>
    )
}