import { Container, Form } from './styles';
import { FiArrowLeft, FiUser, FiEmail, FiLock } from 'react-icons/fi';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export function Profile(){
    return(
        <Container>
            <header>
                <a href="/">
                    <FiArrowLeft />
                </a>
            </header>

            <Form>
                <Input
                    placeholder="Nome" 
                    type="text"
                    icon={FiUser}
                />
                <Input
                    placeholder="E-mail" 
                    type="email"
                    icon={FiEmail}
                />
                <Input
                    placeholder="Senha atual" 
                    type="password"
                    icon={FiLock}
                />
                <Input
                    placeholder="Nova senha" 
                    type="password"
                    icon={FiLock}
                />

                <Button title="Salvar" />
            </Form>
        </Container>

    );
}