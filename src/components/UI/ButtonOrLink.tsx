import { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type ButtonOrLinkProps = ComponentPropsWithoutRef<'button'> & ComponentPropsWithoutRef<'a'>;

export interface Props extends ButtonOrLinkProps { }

export function ButtonOrLink({ href, ...props }: Props) {
    const isLink = typeof href !== 'undefined';
    if (isLink) {
        return <Link href={href} {...props} />;
    } else {
        return <button {...props} />
    }
}