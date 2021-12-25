import React,{useEffect,useState,useCallback} from 'react';
import {ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTheme} from 'styled-components';

import {formataData} from '../../utils/dataFormat';
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
    LogoutButton,
    LoadContainer
} from './styles';

import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard,TransactionCardProps } from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps{
    id:string;
}

const dataKey = '@gofinance:transactions';

interface HighLightProps {
    amount:string;
    lastTransaction:string;
}
interface HighLightData {
    entries:HighLightProps,
    expensives:HighLightProps,
    total:HighLightProps
}

export const Dashboard = () => {
   const [transactions,setTransactions] = useState<DataListProps[]>([]);
   const [highLightData,setHighLightData] = useState({} as HighLightData);
   const [loading,setLoading] = useState(true);

   const theme = useTheme();

   function getLastTransaction(collection:DataListProps[],type:'positive'|'negative'){
 
   
    const lastTransactions = new Date(
        Math.max.apply(Math,collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(formataData(transaction.date)).getTime())));

        
        return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR',{month:'long'})}`  


    }

   async function loadTransaction(){
        setLoading(true);
        const response =  await AsyncStorage.getItem(dataKey);
        const transaction = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: DataListProps[] = transaction
        .map((item:DataListProps) => 
            {
                if(item.type === 'positive'){
                    entriesTotal += Number(item.amount);
                } else {
                    expensiveTotal += Number(item.amount);
                }

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

            setTransactions(transactionsFormatted);
           
            const lastTransactionEntries = getLastTransaction(transactions,'positive');              
            const lastTransactionExpensive = getLastTransaction(transactions,'negative');  
            const totalInterval = `01 a ${lastTransactionExpensive}`;       

            let total = entriesTotal - expensiveTotal;

            setHighLightData({
                entries: {
                    amount:entriesTotal
                          .toLocaleString('pt-Br', {
                              style:'currency',
                              currency:'BRL'
                          }),
                    lastTransaction:`Última entrada dia ${lastTransactionEntries}`
                },
                expensives:{
                    amount:expensiveTotal
                          .toLocaleString('pt-Br', {
                            style:'currency',
                            currency:'BRL'
                           }),
                    lastTransaction:`Última saída dia ${lastTransactionExpensive}`
                },
                total: {
                    amount:total
                           .toLocaleString('pt-Br',{
                               style:'currency',
                               currency:'BRL'
                           }),
                    lastTransaction:totalInterval

                }

            })

            setLoading(false);

   }
    useEffect(() => {
        loadTransaction();
    },[])

    useFocusEffect(useCallback(() => {
           loadTransaction();
        },[]));

    return (
        <Container>
            {
                loading ? <LoadContainer>
                            <ActivityIndicator color={theme.colors.primary} size="large" />
                          </LoadContainer>
                    : 
                <>
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
                        amount={highLightData.entries.amount}
                        lastTransaction={highLightData.entries.lastTransaction}/>
                        <HighLightCard
                        type="down"
                        title="Saídas" 
                        amount={highLightData.expensives.amount}
                        lastTransaction={highLightData.expensives.lastTransaction}/>
                        <HighLightCard
                        type="total"
                        title="Total" 
                        amount={highLightData.total.amount}
                        lastTransaction={highLightData.total.lastTransaction}/>
                    </HighLightCards>
                    <Transactions>
                        <Title>Listagem</Title>
                       
                        <TransactionList<DataListProps|any>
                            data={transactions}
                            keyExtractor={(item:DataListProps) =>item.id }
                            renderItem={({ item }: { item: DataListProps })  => <TransactionCard data={item}/>}
                        />
                                
                    </Transactions>
                </>
            }
        </Container>
    )
}


  