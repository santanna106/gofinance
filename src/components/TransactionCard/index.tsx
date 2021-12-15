import React from 'react';
import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';

export const TransactionCard = () => {
    return (
        <Container>
            <Title>Desenvolvimento de Site</Title>
            <Amount>R$ 12.000,00</Amount>
            <Footer>
                <Category>
                    <Icon name="dollar-sign"/>
                    <CategoryName>Vendas</CategoryName>
                </Category>
                <Date>14/12/2021</Date>
            </Footer>
        </Container>
    )
}