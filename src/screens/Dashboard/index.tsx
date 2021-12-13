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
    HighLightCards
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { HighLightCard } from '../../components/HighLightCard';

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
                <HighLightCard />
                <HighLightCard />
                <HighLightCard />
            </HighLightCards>
        </Container>
    )
}


  