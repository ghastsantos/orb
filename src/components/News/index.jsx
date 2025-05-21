import React, { useState } from 'react';
import { Container, Image, Card, CarouselWrapper, Controls } from './styles';
import { Tag } from '../Tag';

export function News({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <p>Nenhuma notícia disponível.</p>;
    }

    return (
        <Container>
            <CarouselWrapper style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {data.map((newsItem) => (
                    <Card key={newsItem.id}>
                        <Image>
                            <img
                                src={newsItem.image || ''}
                                alt={`Imagem de ${newsItem.title}`}
                            />
                        </Image>
                        <h1>{newsItem.title}</h1>
                        {newsItem.tags && (
                            <footer>
                                {newsItem.tags.map((tag) => (
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