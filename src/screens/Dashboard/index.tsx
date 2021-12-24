import React,{useEffect,useState,useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighLightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton
} from './styles';

import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard,TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps{
    id:string;
}

const dataKey = '@gofinance:transactions';

export const Dashboard = () => {
   const [data,setData] = useState<DataListProps[]>([]);

   async function loadTransaction(){
        const response =  await AsyncStorage.getItem(dataKey);

        const transaction = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transaction
        .map((item:DataListProps) => 
            {
                const amount = Number(item.amount)
                .toLocaleString('pt-BR',{
                    style:'currency',
                    currency:'BRL'
                });

                const date = Intl.DateTimeFormat('pt-BR',{
                    day:'2-digit',
                    month:'2-digit',
                    year:'2-digit'
                }).format(new Date(item.date));

                return {
                    id:item.id,
                    name:item.name,
                    amount,
                    type:item.type,
                    category:item.category,
                    date

                }

            });

            setData(transactionsFormatted);
   }
    useEffect(() => {
        loadTransaction();
    },[])

    useFocusEffect(useCallback(() => {
           loadTransaction();
        },[]));

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{uri:'https://avatars.githubusercontent.com/u/10618397?v=4'}}/>
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Gabriel</UserName>
                        </User>
                    </UserInfo>
                    <LogoutButton onPress={() => {}}>
                        <Icon name="power"/>
                    </LogoutButton>
                </UserWrapper>
            </Header>
            <HighLightCards>
                <HighLightCard
                  type="up"
                  title="Entradas" 
                  amount="17.400,00"
                  lastTransaction="Última transação foi 13 de novembro"/>
                 <HighLightCard
                  type="down"
                  title="Saídas" 
                  amount="1.400,00"
                  lastTransaction="Última transação foi 9 de dezembro"/>
                 <HighLightCard
                  type="total"
                  title="Total" 
                  amount="17.000,00"
                  lastTransaction="Última transação foi 10 de dezembro"/>
            </HighLightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList<DataListProps|any>
                    data={data}
                    keyExtractor={(item:DataListProps) =>item.id }
                    renderItem={(item:DataListProps) => <TransactionCard data={item}/>}
                />
                
            </Transactions>
        </Container>
    )
}


  