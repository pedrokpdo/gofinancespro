import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

interface ContainerProps {
    color:string;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    background-color: ${({theme})=> theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;
    padding: 13px 24px;
    border-radius: 5px;
    border-left-width: 5px;
    border-left-color:  ${({color})=> color};
    margin-bottom: 8px;
`

export const Title = styled.Text`
    font-weight: 400;
    font-size: ${RFValue(15)}px;
`

export const Amount = styled.Text`
    font-weight: 700;
    font-size: ${RFValue(15)}px;
`