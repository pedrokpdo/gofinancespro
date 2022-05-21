import React, { useEffect, useState } from "react";
import { HistoryCard } from "../../components/HistoryCard";
import { ChartContainer, Container, Content, Header, Month, MonthSelect, MonthSelectButton, MonthSelectIcon, Title } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TransactionCardProps } from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import { VictoryPie } from 'victory-native'
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths, format} from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

export function Resume() {
    const [totalByCategories, seTtotalByCategories] = useState<CategoryData[]>([])
    const [selectedDate, setSelectedDate] = useState(new Date())

    const theme = useTheme()

    function handleChangeData(action: 'next' | 'prev') {
        if (action === 'next') {
            const newDate = addMonths(selectedDate, 1)
            setSelectedDate(newDate)
            console.log(newDate);

        } else {
            const newDate = subMonths(selectedDate, 1)
            setSelectedDate(newDate)
        }
    }

    async function loadData() {
        const dataKey = '@gofinancespro:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormatted = response ? JSON.parse(response) : []

        const expensives = responseFormatted
            .filter((expensive: Props) => 
            expensive.type === 'negative' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear() 
            
            )

        const expensivesTotal = expensives.reduce((acumulator: number, expensive: Props) => {
            return acumulator + Number(expensive.amount)
        }, 0)


        const totalByCategory: CategoryData[] = []

        categories.forEach(category => {
            let categorySum = 0

            expensives.forEach((expensive: Props) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount)
                }
            })
            if (categorySum > 0) {
                const totalFormatted = categorySum.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
                const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;
                totalByCategory.push({
                    name: category.name,
                    color: category.color,
                    total: totalFormatted,
                    key: categorySum,
                    totalFormatted,
                    percent,
                })
            }
        })
        seTtotalByCategories(totalByCategory)
    }

    useEffect(() => {
        loadData()
    }, [selectedDate])

    return (
        <Container>
            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>
            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),
                }}
            >
                <MonthSelect>
                    <MonthSelectButton onPress={() => handleChangeData('prev')}>
                        <MonthSelectIcon name='chevron-left' />
                    </MonthSelectButton>
                    <Month>{format(selectedDate, 'MMMM yyy', {locale: ptBR})}</Month>
                    <MonthSelectButton onPress={() => handleChangeData('next')}>
                        <MonthSelectIcon name='chevron-right' />
                    </MonthSelectButton>
                </MonthSelect>
                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape,
                            }
                        }}
                        labelRadius={50}
                        x="percent"
                        y="total"
                    />
                </ChartContainer>
                {
                    totalByCategories.map(item => (
                        <HistoryCard
                            key={item.key}
                            title={item.name}
                            amount={item.totalFormatted}
                            color={item.color}
                        />
                    ))

                }
            </Content>
        </Container>
    )
}