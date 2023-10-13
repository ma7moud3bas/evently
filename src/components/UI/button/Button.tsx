"use client"

import { cva, VariantProps } from "cva";
import { ButtonOrLink, Props as ButtonOrLinkProps } from "../ButtonOrLink";

const buttonStyles = cva(
    "",
    {
        variants: {
            intent: {
                primary: "",
                secondary: "",
            },
            fullWidth: {
                true: "",
            }
        },
        defaultVariants: {
            intent: "primary",
        }
    })

export interface Props extends ButtonOrLinkProps, VariantProps<typeof buttonStyles> { }

export default function Button({ intent, fullWidth, ...props }: Props) {
    return (
        <ButtonOrLink className={buttonStyles({ intent, fullWidth })} {...props} />
    )
}