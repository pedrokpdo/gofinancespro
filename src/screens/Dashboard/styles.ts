import styled from "styled-components/native";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'



export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`
export const Header = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.primary};
    height: ${RFPercentage(42)};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
`
export const UserContainer = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 45px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Photo = styled.Image`
width: ${RFValue(48)}px;
height: ${RFValue(48)}px;
border-radius: 10px;
`
export const User = styled.View`
    margin-left: 17px;
`

export const UserGreeting = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-size: ${RFValue(18)}px;
`

export const UserName = styled.Text`
    color: ${({theme})=>theme.colors.shape};
    font-size: ${RFValue(18)}px;
    font-weight: bold;
`

export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
    contentContainerStyle:{paddingHorizontal:24},
    horizontal:true,
    showsHorizontalScrollIndicator: false
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;

    margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-weight: 500;
    margin-bottom: 16px;

`