import React from "react";
import { Alert } from "react-native";
import { SvgProps } from "react-native-svg";
import { useAuth } from "../../hooks/auth";
import { Button, ImgageContainer, Text } from "./styles";

interface Props {
    title: string;
    svg: React.FC<SvgProps>;
}

export function SignInSocialButton({ title, svg: Svg }: Props) {

    const { signInWithGoogle } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle()
        } catch (error) {
            console.log(error);
            Alert.alert('Nao foi possivel conectar a conta google')
        }
    }
    return (
        <Button onPress={handleSignInWithGoogle}>
            <ImgageContainer>
                <Svg />
            </ImgageContainer>
            <Text>
                {title}
            </Text>
        </Button>
    )
}