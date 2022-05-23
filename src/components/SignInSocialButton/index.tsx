import React from "react";
import { Alert } from "react-native";
import { SvgProps } from "react-native-svg";
import { useAuth } from "../../hooks/auth";
import { Button, ImgageContainer, Text } from "./styles";

interface Props {
    title: string;
    svg: React.FC<SvgProps>;
    press: () => void;
}

export function SignInSocialButton({ title, svg: Svg, press }: Props) {

  
    return (
        <Button onPress={press}>
            <ImgageContainer>
                <Svg />
            </ImgageContainer>
            <Text>
                {title}
            </Text>
        </Button>
    )
}