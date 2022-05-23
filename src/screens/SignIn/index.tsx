import React, { useContext } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from "./styles";
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { RFValue } from "react-native-responsive-fontsize";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from '../../hooks/auth'

export function SignIn() {

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
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />
                    <Title>
                        Controle suas {'\n'}
                        Finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton
                        title="Entrar com Google"
                        svg={GoogleSvg}
                        press={handleSignInWithGoogle}
                    />
                    <TouchableOpacity>
                        <SignInSocialButton
                            title="Entrar com Apple"
                            svg={AppleSvg}
                            press={handleSignInWithGoogle}
                        />
                    </TouchableOpacity>
                </FooterWrapper>
            </Footer>
        </Container>
    )
}