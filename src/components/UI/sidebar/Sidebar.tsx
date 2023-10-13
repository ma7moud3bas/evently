
import { ComponentProps } from "react";

export type Props = ComponentProps<"aside">

export default function Sidebar(props: Props) {
    return (
        <aside {...props}>
        </aside>
    )
}
