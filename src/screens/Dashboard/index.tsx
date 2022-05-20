import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import { Container, Header, HighlightCards, Icon, LoadContainer, LogoutButton, Photo, Title, TransactionList, Transactions, User, UserContainer, UserGreeting, UserInfo, UserName } from './styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'



export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    amount: string;
}
interface HighLightData {
    entries: HighLightProps;
    expensives: HighLightProps;
    total: HighLightProps;

}



export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData)

    const theme = useTheme()

    async function loadTransactions() {
        const dataKey = '@gofinancespro:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const transactions = response ? JSON.parse(response) : []

        let entrieuTotal = 0;
        let expenseveTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

            if (item.type === 'positive') {
                entrieuTotal += Number(item.amount)
            } else {
                expenseveTotal += Number(item.amount)
            }

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
        setTransactions(transactionsFormatted)
        const total = entrieuTotal - expenseveTotal
        setHighLightData({
            entries: {
                amount: entrieuTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })
            },
            expensives: {
                amount: expenseveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                })
            }
        })
        setIsLoading(false)
    }

    useEffect(() => {
        loadTransactions()
        /*Clear Storage */

        /*const dataKey = '@gofinancespro:transactions'
        AsyncStorage.removeItem(dataKey) */

    }, [])

    useFocusEffect(useCallback(() => {
        loadTransactions()
    }, []))

    return (
        <Container>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size='large'

                        />
                    </LoadContainer>
                    :
                    <>
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
                                amount={highLightData.entries.amount}
                                lastTransaction="Última entrada dia 13 de abril"
                            />
                            <HighlightCard
                                type='down'
                                title='Saidas'
                                amount={highLightData.expensives.amount}
                                lastTransaction="Última saida dia 03 de abril"
                            />
                            <HighlightCard
                                type='total'
                                title='Total'
                                amount={highLightData.total.amount}
                                lastTransaction="Última entrada dia 13 de abril"
                            />

                        </HighlightCards>
                        <Transactions>
                            <Title>Listagem</Title>
                            <TransactionList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />

                        </Transactions>
                    </>
            }
        </Container>
    )
}

