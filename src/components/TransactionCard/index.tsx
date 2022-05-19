import React from "react";
import { Amount, Category, CategoryName, Container, Date, Footer, Icon, Title } from "./styles";

interface Category {
    name: string;
    icon: string;
}

interface Props {
    data: {
        title: string;
        amount: string;
        category: Category;
        date:string;
    }
}

export function TransactionCard ({data}:Props) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Amount>{data.amount}</Amount>
            <Footer>
                <Category>
                    <Icon name='dollar-sign'/>
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}