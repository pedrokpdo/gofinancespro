import React, { useState, useEffect } from "react";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from "../../components/Forms/Button";
import { CategorySelect as CategorySelectButton } from "../../components/Forms/CategorySelect";
import { Input } from "../../components/Forms/Input";
import { TransactionButton } from "../../components/Forms/TransactionButton";
import { Container, Fields, Form, Header, Title, TransactionsTypes } from "./styles";
import { CategorySelect } from '../CategorySelect'
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

export interface FormData {
    [name: string]: string;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Nome é Obrigatorio'),
    amount: Yup.number().typeError('Informe um valor númerico').positive('o valor nao pode ser negativo').required('O valor é obrigatorio')
})

export function Register() {
    const collectionKey = '@gofinancespro:transactions'
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [transactionType, setTransactionType] = useState('')
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    async function handleRegister(form: FormData) {
        if (!transactionType)
            return Alert.alert('Selecione o tipo da transaçao')

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const newTransaction = {
            name: form.name,
            amount: form.amount,
            transactionType,
            category: category.key
        }

        try {
            const data = await AsyncStorage.getItem(collectionKey)
            const currentData = data ? JSON.parse(data) : []
            const dataFormatted = [...currentData, newTransaction]
            await AsyncStorage.setItem(collectionKey, JSON.stringify(dataFormatted))
        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possivel salvar')

        }

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

    useEffect(() => {
        async function loadData() {
            const data = await AsyncStorage.getItem(collectionKey);
            console.log(JSON.parse(data!));

        }
        loadData()

        /*    async function removeAll() {
               await AsyncStorage.removeItem(collectionKey)
           }
           removeAll() */
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}

                        />
                        <InputForm
                            control={control}
                            placeholder="Preço"
                            name='amount'
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
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
        </TouchableWithoutFeedback>
    )
}