import React from "react";
import { Text, View } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { Container, Header, HighlightCards, Icon, Photo, User, UserContainer, UserGreeting, UserInfo, UserName } from './styles'
export function Dashboard() {
    return (
        <Container>
            <Header>
                <UserContainer>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/100696926?v=4' }}
                        />
                        <User>
                            <UserGreeting>Olá</UserGreeting>
                            <UserName>Pedro</UserName>
                        </User>
                    </UserInfo >
                    <Icon name='power' />
                </UserContainer>
            </Header>
            <HighlightCards>
                <HighlightCard 
                type='up'
                title='Entradas' 
                amount="R$ 17.400,00" 
                lastTransaction="Última entrada dia 13 de abril"
                />
                <HighlightCard 
                type='down'
                title='Saidas' 
                amount="R$ 1.259,00" 
                lastTransaction="Última saida dia 03 de abril"
                />
                <HighlightCard
                type='total'
                title='Total' 
                amount="R$ 16.141,00" 
                lastTransaction="Última entrada dia 13 de abril"
                />
               
            </HighlightCards>
        </Container>
    )
}

