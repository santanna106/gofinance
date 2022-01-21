import React,{useState} from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';

import {
    useNavigation,
    NavigationProp,
    ParamListBase,
} from '@react-navigation/native';

import {useForm} from 'react-hook-form';
import { useAuth } from '../../hooks/auth';


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
        .required('O valor é obrigatório')
})



export function Register () {
    const [category,setCategory] = useState({
        key:'category',
        name:'Categoria'
    });
    const [transactionType,setTransactionType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const {user} = useAuth();

   

   // const { navigate }: NavigationProp<ParamListBase> = useNavigation();
   
    const { 
        control,
        handleSubmit,
        formState:{errors},
        reset
    } = useForm({
      resolver:yupResolver(schema)
    }); 

    function handleTransactionsTypeSelect (type:'positive'|'negative'){
        setTransactionType(type);
    }

    function handleCloseModalSelectCategory(){
        setCategoryModalOpen(false);
    }

    function handleOpenModalSelectCategory(){
        setCategoryModalOpen(true);
    }

   async function handleRegister(form:FormData){
        if(!transactionType)
            return Alert.alert('Selecione o tipo de transação');

        if(category.key === 'category')
            return Alert.alert('Selecione a categoria'); 
        
        const newTransaction = {
            id:String(uuid.v4()),
            name:form.name,
            amount:form.amount,
            type:transactionType,
            category:category.key,
            date: new Date()
        }

        

        try {
            const dataKey = `@gofinance:transactions_user:${user.id}`;
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];

            const dataFormatted = [
                ...currentData,
                newTransaction
            ];

            await AsyncStorage.setItem(dataKey,JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({key:'category',name:'Categoria'});

           // navigate("Listagem"); 

        } catch (error) {
            console.log(error);
            Alert.alert("Não foi possível salvar")
        }
        
       

        
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
                            onPress={() => handleTransactionsTypeSelect('positive')} 
                            isActive={transactionType === 'positive'}/>

                            <TransactionButtonType
                            type="down"
                            title="outcome"
                            onPress={() => handleTransactionsTypeSelect('negative')}
                            isActive={transactionType === 'negative'}
                            />
                        </TransactionTypes>
                        <CategorySelectButton
                            testID='button-category'
                            title={category.name}
                            onPress={handleOpenModalSelectCategory} 
                            
                        />
                    </Fields>
                    <ButtonEnviar onPress={handleSubmit(handleRegister)} >
                        <ButtonText>Enviar</ButtonText>
                    </ButtonEnviar>
                </Form>
                <Modal testID='modal-category' visible={categoryModalOpen}>
            
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