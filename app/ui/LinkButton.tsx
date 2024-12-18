'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function LinkButton(param: {
    label: string,
    href: string,
    props: string | ''
}) {
    return (
        <Link
            className={` text-base py-2 px-5 rounded-3xl ${param.props}`}
            key={param.href}
            href={param.href}
            >
            {param.label}
        </Link>
    );
}