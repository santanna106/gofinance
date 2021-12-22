import React,{useState} from 'react';
import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionButtonType } from '../../components/Forms/TransactionTypeButton';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

export function Register () {
    const [transactionType,setTransactionType] = useState('');

    function handleTransactionsTypeSelect (type:'up'|'down'){
        setTransactionType(type);
    }
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
                    <TransactionTypes>
                        <TransactionButtonType 
                           type="up" 
                           title="Income"
                           onPress={() => handleTransactionsTypeSelect('up')} 
                           isActive={transactionType === 'up'}/>

                        <TransactionButtonType
                         type="down"
                         title="outcome"
                         onPress={() => handleTransactionsTypeSelect('down')}
                         isActive={transactionType === 'down'}
                          />
                    </TransactionTypes>
                </Fields>
                <Button title="Enviar" />
            </Form>
        </Container>
    )
}