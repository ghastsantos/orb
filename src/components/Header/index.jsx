import { Container, Profile, Logout } from './styles';
import { FiLogOut } from "react-icons/fi";

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
                    <FiLogOut />
                </Logout>
            </Profile>
        </Container>
    )
}