import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { Container, Content, Header, Title } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import { VictoryPie } from 'victory-native'

interface Props {
    type: 'positive' | 'negative';
    name: string;
    amount: string;
    category: string;
    date: string;
}

interface CategoryData {
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume() {
    const [totalByCategories, seTtotalByCategories] = useState<CategoryData[]>([])

    async function loadData() {
        const dataKey = '@gofinancespro:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted
            .filter((expensive: Props) => expensive.type === 'negative')

        const totalByCategory: CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0

            expensives.forEach((expensive: Props) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })
            if (categorySum > 0) {
                const total = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                totalByCategory.push({
                    name: category.name,
                    color: category.color,
                    total,
                    key: category.key,
                })
            }
        })
        seTtotalByCategories(totalByCategory)
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>
            <Content>
                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.total}
                            color={item.color}
                        />
                    ))

                }
            </Content>
        </Container>
    )
}