import React, { useState } from "react";
import { Button } from "../../components/Forms/Button";
import { Input } from "../../components/Forms/Input";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";

export function Register() {
    const [transactionType, setTransactionType] = useState('')

    function handleTransactionButtonSelect(type: string) {
        setTransactionType(type)
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>
            <Form>
                <Fields>
                    <Input
                        placeholder="Nome"
                    />
                    <Input
                        placeholder="Preço"
                    />
                    <TransactionsTypes>
                        <TransactionButton
                            isActive={transactionType === 'up'}
                            onPress={() => handleTransactionButtonSelect('up')}
                            type='up'
                            title='income'
                        />
                        <TransactionButton
                            isActive={transactionType === 'down'}
                            onPress={() => handleTransactionButtonSelect('down')}
                            type='down'
                            title='outcome'
                        />
                    </TransactionsTypes>
                </Fields>
                <Button title='Enviar' />
            </Form>
        </Container>
    )
}