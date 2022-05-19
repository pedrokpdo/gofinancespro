import React from "react";
import { Text, View } from "react-native";
import { Container, Header, Photo, User, UserContainer, UserGreeting, UserInfo, UserName } from './styles'

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
                </UserContainer>
            </Header>
        </Container>
    )
}

