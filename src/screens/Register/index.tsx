import React from 'react';
import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionButtonType } from '../../components/Forms/TransactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields
} from './styles';

export function Register () {
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>

                <Fields>
                    <Input
                        placeholder="Nome"
                    />

                    <Input
                        placeholder="Preço"
                    />
                    <TransactionButtonType type="up" title="Income" />
                </Fields>
                <Button title="Enviar" />
            </Form>
        </Container>
    )
}