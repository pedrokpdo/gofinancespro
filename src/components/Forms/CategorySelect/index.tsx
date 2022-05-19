import React from "react";
import { Category, Container, Icon } from "./styles";

interface Props {
    title: string;
    onPress: () => void;
}

export function CategorySelect({ title, onPress }: Props) {
    return (
        <Container onPress={onPress}>
            <Category>{title}</Category>
            <Icon name='chevron-down' />
        </Container>
    )
}