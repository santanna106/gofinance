import React,{useState} from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';


import { Input } from '../../components/Forms/Input';
import { InputForm } from '../../components/Forms/InputForm';
import { TransactionButtonType } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';

import {CategorySelect  } from '../CategorySelect';

import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionTypes,
    ButtonEnviar,
    ButtonText
} from './styles';

interface FormData {
    name:string;
    amount: string;
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('Nome é obrigatório'),
    amount: Yup
        .number()
        .typeError('Informe um valor numérico')
        .positive('O valor deve ser positivo')
        .required('O preço é obrigatório')
})

export function Register () {
    const [category,setCategory] = useState({
        key:'category',
        name:'Categoria'
    });
    const [transactionType,setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const { 
        control,
        handleSubmit,
        formState:{errors}
    } = useForm({
      resolver:yupResolver(schema)
    }); 

    function handleTransactionsTypeSelect (type:'up'|'down'){
        setTransactionType(type);
    }

    function handleCloseModalSelectCategory(){
        setCategoryModalOpen(false);
    }

    function handleOpenModalSelectCategory(){
        setCategoryModalOpen(true);
    }

    function handleRegister(form:FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo de transação');

        if(category.key === 'category')
            return Alert.alert('Selecione a categoria'); 
        
        const data = {
            name:form.name,
            amount:form.amount,
            transactionType,
            category:category.key,
        }
        
       

        console.log(data);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>

                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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
                    <ButtonEnviar onPress={handleSubmit(handleRegister)} >
                        <ButtonText>Enviar</ButtonText>
                    </ButtonEnviar>
                </Form>
                <Modal visible={categoryModalOpen}>
            
                    <CategorySelect 
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseModalSelectCategory}
                    />
            
                </Modal>
                
            </Container>
        </TouchableWithoutFeedback>
    )
}