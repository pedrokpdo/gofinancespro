import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { Container, Header, HighlightCards, Icon, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserContainer, UserGreeting, UserInfo, UserName } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'


export interface DataListProps extends TransactionCardProps {
    id: string;
}



export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([])

    async function loadTransactions() {
        const dataKey = '@gofinancespro:transactions'
        const response = await AsyncStorage.getItem(dataKey)

        const transactions = response ? JSON.parse(response) : []

        const transactionsFormatted: DataListProps[] = transactions.map((item:DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date))
            return {
                id: item.id,
                name: item.name,
                amount, 
                type: item.type,
                category: item.category,
                date,
            }
        })
        setData(transactionsFormatted)

    }

    useEffect(() => {
        loadTransactions()
        /*Clear Storage */  

        /*const dataKey = '@gofinancespro:transactions'
        AsyncStorage.removeItem(dataKey) */

    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions()
    },[]))

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
                    <LogoutButton onPress={() => { }}>
                        <Icon name='power' />
                    </LogoutButton>
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

