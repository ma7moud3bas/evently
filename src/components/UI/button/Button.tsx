"use client"

import { cva, VariantProps } from "cva";
import { ButtonOrLink, Props as ButtonOrLinkProps } from "../ButtonOrLink";
import classNames from "classnames";

const buttonStyles = cva(
    "flex items-center px-4 py-2.5 border border-gray-700 text-[14px] font-bold",
    {
        variants: {
            intent: {
                primary: "bg-white text-gray-700",
                secondary: "bg-gray-900 text-white",
            },
            fullWidth: {
                true: "w-full",
            }
        },
        defaultVariants: {
            intent: "primary",
        }
    })

export interface Props extends ButtonOrLinkProps, VariantProps<typeof buttonStyles> { }

export default function Button({ intent, fullWidth, className, ...props }: Props) {
    return (
        <ButtonOrLink className={classNames(buttonStyles({ intent, fullWidth }), className)} {...props} />
    )
}