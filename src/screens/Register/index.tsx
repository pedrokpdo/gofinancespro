import React, { useState } from "react";
import { Modal } from "react-native";
import { Button } from "../../components/Forms/Button";
import { CategorySelect as CategorySelectButton } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";
import { CategorySelect } from '../CategorySelect'
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";

export interface FormData {
    [name: string]: string;
  }

export function Register() {
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const { control, handleSubmit } = useForm()

    function handleRegister(form:FormData) {
        const data = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        console.log(data);

    }

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
                    <InputForm
                        control={control}
                        name='name'
                        placeholder="Nome"
                    />
                    <InputForm
                        control={control}
                        placeholder="Preço"
                        name='amount'
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
                        title={category.name} />
                </Fields>
                <Button
                    title='Enviar'
                    onPress={handleSubmit(handleRegister)}
                />
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