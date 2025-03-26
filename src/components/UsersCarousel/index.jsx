import React, { useState } from 'react';
import { Container, CarouselWrapper, Card, Image, Controls } from './styles';
import { Tag } from '../Tag';

export function UsersCarousel({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(data.length / 3) - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === Math.ceil(data.length / 3) - 1 ? 0 : prevIndex + 1));
    };

    const getVisibleUsers = () => {
        if (window.innerWidth <= 480) {
            return 2;
        } else if (window.innerWidth <= 768) {
            return 3;
        }
        return 3;
    };


    if (!Array.isArray(data) || data.length === 0) {
        return <p>Nenhum usuário disponível.</p>;
    }

    const visibleUsers = data.slice(currentIndex * getVisibleUsers(), currentIndex * getVisibleUsers() + getVisibleUsers());

    return (
        <Container>
            <CarouselWrapper>
                {visibleUsers.map((user) => (
                    <Card key={user.id}>
                        <Image>
                            <img
                                src={user.image || 'https://via.placeholder.com/100'}
                                alt={`Foto de ${user.name}`}
                                onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
                            />
                        </Image>
                        <h1>{user.name}</h1>
                        {user.tags && (
                            <footer>
                                {user.tags.map((tag) => (
                                    <Tag key={tag.id} title={tag.name} />
                                ))}
                            </footer>
                        )}
                    </Card>
                ))}
            </CarouselWrapper>
            <Controls>
                <button onClick={handlePrev}>❮</button>
                <button onClick={handleNext}>❯</button>
            </Controls>
        </Container>
    );
}