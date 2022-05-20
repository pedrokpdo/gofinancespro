import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    background-color: ${({theme})=>theme.colors.background};
    flex: 1;
`

export const Header = styled.View`
    background-color: ${({theme})=>theme.colors.primary};
    width: 100%;
    height: ${RFValue(113)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`

export const Title = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-weight: 400;
    font-size: ${RFValue(18)}px;
`

export const Content = styled.ScrollView.attrs({
    contentContainerStyle:{padding: 24, flex:1}
})`

`

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`