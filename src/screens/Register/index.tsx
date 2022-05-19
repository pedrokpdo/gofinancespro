import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelect as CategorySelectButton } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";
import {CategorySelect} from '../CategorySelect'

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('')
    const [ categoryModalOpen, setCategoryModalOpen ] = useState(false)

    function handleTransactionButtonSelect(type: string) {
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true)
    }
    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false)
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

                    <CategorySelectButton 
                    onPress={handleOpenSelectCategoryModal}
                    title={category.name}/>
                </Fields>
                <Button title='Enviar' />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}