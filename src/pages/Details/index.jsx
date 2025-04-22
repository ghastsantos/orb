import { Container, Content } from './styles';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from '../../components/ButtonText';
import { Tag } from '../../components/Tag';
import { Links } from '../../components/Section/styles';

export function Details(){
    return (
        <Container>
            <Header/>

            <main>
                <Content>
                    <ButtonText title="Excluir nota"/>
                    <h1>Introdução ao React</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum deserunt perspiciatis soluta neque culpa veritatis voluptas expedita ad libero ut voluptates quaerat asperiores perferendis natus aliquid harum, dolores similique non?</p>
                    <Section title="Links úteis">
                        <Links>
                            <li><a href="#">Link 1</a></li>
                            <li><a href="#">Link 2</a></li>
                        </Links>
                    </Section>
                    <Section title="Marcadores">
                        <Tag title="Express"/>
                        <Tag title="Node"/>
                    </Section>
                    <Button title="Voltar"/>
                </Content>
            </main>
        </Container>
    )
}