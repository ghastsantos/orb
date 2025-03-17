import { Container } from './styles';
import { Links } from './styles';

export function Section({ title, children }){
    return(
        <Container>
            <h2>{title}</h2>
            {children}
        </Container>      
    );
}
