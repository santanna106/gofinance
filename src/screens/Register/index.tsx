import React,{useState} from 'react';
import {Modal} from 'react-native';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';
import { TransactionButtonType } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import {CategorySelect  } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes
} from './styles';

export function Register () {
    const [category,setCategory] = useState({
        key:'category',
        name:'Categoria'
    });
    const [transactionType,setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    function handleTransactionsTypeSelect (type:'up'|'down'){
        setTransactionType(type);
    }

    function handleCloseModalSelectCategory(){
        setCategoryModalOpen(false);
    }

    function handleOpenModalSelectCategory(){
        setCategoryModalOpen(true);
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
                    <CategorySelectButton
                      title={category.name}
                      onPress={handleOpenModalSelectCategory} />
                </Fields>
                <Button title="Enviar" />
            </Form>
            <Modal visible={categoryModalOpen}>
          
                <CategorySelect 
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseModalSelectCategory}
                />
          
            </Modal>
        </Container>
    )
}