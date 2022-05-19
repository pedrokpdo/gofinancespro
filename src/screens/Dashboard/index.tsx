import React from "react";
import { Text, View } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { Container, Header, HighlightCards, Icon, Photo, Title, TransactionList, Transactions, User, UserContainer, UserGreeting, UserInfo, UserName } from './styles'


export interface DataListProps extends TransactionCardProps {
    id: string;
}

const data: DataListProps[] = [
    {
        id: '1',
        type: 'positive',
        date: "13/04/2022",
        title: "Desenvolvimente de site",
        amount: "RS 12.000,00",
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        }
    },
    {
        id: '2',
        type: 'negative',
        date: "13/04/2022",
        title: "Hamburgueria Pizza",
        amount: "R$ 59,00",
        category: {
            name: 'Alimentaçao',
            icon: 'coffee'
        }
    },
    {
        id: '3',
        type: 'negative',
        date: "13/04/2022",
        title: "Desenvolvimente de site",
        amount: "R$ 1.200,00",
        category: {
            name: 'Casa',
            icon: 'shopping-bag'
        }
    },

]

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
            <Transactions>
                <Title>Listagem</Title>
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>

        </Container>
    )
}

