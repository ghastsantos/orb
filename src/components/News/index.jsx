import React, { memo } from 'react';
import Slider from 'react-slick';
import { Container, Image, Card } from './styles';
import { Tag } from '../Tag';

export const News = memo(function News({ data }) {

    if (!Array.isArray(data) || data.length === 0) {
        return <p>Nenhuma notícia disponível.</p>;
    }
    
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: false,
        draggable: false,
        autoplay: false,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <Container>
            <Slider {...settings}>
                {data.map((newsItem) => (
                    <Card key={newsItem.id}>
                        <Image>
                            <img src={newsItem.image} alt={`Imagem de ${newsItem.title}`} />
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
            </Slider>
        </Container>
    );
});