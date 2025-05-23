import React, { useState } from 'react';
import { Container, Image, Card, CarouselWrapper, Controls } from './styles';
import { Tag } from '../Tag';
import { Modal } from '../Modal'; 

export function News({ data }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [noticiaSelecionada, setNoticiaSelecionada] = useState(null);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? data.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === data.length - 1 ? 0 : prevIndex + 1));
    };

    if (!Array.isArray(data) || data.length === 0) {
        return <p>Nenhuma notícia disponível.</p>;
    }

    function formatarDataBR(dataISO) {
    if (!dataISO) return "";
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
    }

    return (
        <Container>
            <CarouselWrapper style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {data.map((newsItem) => (
                    <Card
                        key={newsItem.id}
                        onClick={() => { setNoticiaSelecionada(newsItem); setModalOpen(true); }}
                        style={{ cursor: 'pointer' }}
                    >
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
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                {noticiaSelecionada && (
                    <div>
                        <h2>{noticiaSelecionada.title}</h2>
                        <div style={{ margin: "16px 0" }}>
                            {noticiaSelecionada.image && (
                                <img
                                    src={noticiaSelecionada.image}
                                    alt="Notícia"
                                    style={{ width: "100%", objectFit: "cover", borderRadius: 6 }}
                                />
                            )}
                        </div>
                        <p style={{ color: "#fff", whiteSpace: "pre-line" }}>{noticiaSelecionada.content}</p>
                    </div>
                )}
            </Modal>
        </Container>
    );
}