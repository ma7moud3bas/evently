import { ButtonOrLink, Props as ButtonOrLinkProps } from '../ButtonOrLink';

export interface Props extends ButtonOrLinkProps { }

export default function Link(props: Props) {

    return (
        <ButtonOrLink
            {...props}
        />
    );
}