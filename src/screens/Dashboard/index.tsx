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
    lastTransaction: string;
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

        const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive')
        const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative')
        const totalInterval = `01 a ${lastTransactionsExpensives}`

        function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative'){


            const lastTransactions = new Date(
            Math.max.apply(Math, collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime())))
           
            return `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', { month: 'long' })}`
            
        }

        const total = entrieuTotal - expenseveTotal
        setHighLightData({
            entries: {
                amount: entrieuTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: `Última entrada dia${lastTransactionsEntries}`
            },
            expensives: {
                amount: expenseveTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: `Última saída dia${lastTransactionsExpensives}`
            },
            total: {
                amount: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
                lastTransaction: totalInterval,
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
                                lastTransaction={highLightData.entries.lastTransaction}
                            />
                            <HighlightCard
                                type='down'
                                title='Saidas'
                                amount={highLightData.expensives.amount}
                                lastTransaction={highLightData.expensives.lastTransaction}
                            />
                            <HighlightCard
                                type='total'
                                title='Total'
                                amount={highLightData.total.amount}
                                lastTransaction={highLightData.total.lastTransaction}
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

