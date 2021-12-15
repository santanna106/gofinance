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
    Title
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { HighLightCard } from '../../components/HighLightCard';
import { TransactionCard } from '../../components/TransactionCard';

export const Dashboard = () => {
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
                <TransactionCard />
            </Transactions>
        </Container>
    )
}


  