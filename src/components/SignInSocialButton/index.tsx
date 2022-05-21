import React from "react";
import { SvgProps } from "react-native-svg";
import { Button, ImgageContainer, Text } from "./styles";

interface Props {
    title: string;
    svg: React.FC<SvgProps>;
}

export function SignInSocialButton({title, svg:Svg}:Props) {
    return (
        <Button>
            <ImgageContainer>
                <Svg/>
            </ImgageContainer>
            <Text>
                {title}
            </Text>
        </Button>
    )
}