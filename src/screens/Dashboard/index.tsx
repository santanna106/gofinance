import React from 'react';

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
    TransactionList
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard,TransactionCardProps } from '../../components/TransactionCard';


export interface DataListProps extends TransactionCardProps{
    id:string;
}

export const Dashboard = () => {
    const data:DataListProps[] = [{
        id:'1',
        type:'positive',
        title:"Desenvolvimento de Site",
        amount:"R$ 12.000,00",
        category: {
            name:"Vendas",
            icon:'dollar-sign'
        },
        date:"13/04/2021"
    },
    {
        id:'2',
        type:'negative',
        title:"Hamburgueria Pizzy",
        amount:"R$ 59,00",
        category: {
            name:"Alimentação",
            icon:'coffee'
        },
        date:"13/04/2021"
    },
    {
        id:'3',
        type:'negative',
        title:"Aluguel do Apartamento",
        amount:"R$ 2.000,00",
        category: {
            name:"Casa",
            icon:'shopping-bag'
        },
        date:"13/04/2021"
    }
]
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
                    <Icon name="power"/>
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
                <TransactionList
                    data={data}
                    keyExtractor={item =>item.id }
                    renderItem={({item}) => <TransactionCard data={item}/>}
                />
                
            </Transactions>
        </Container>
    )
}


  