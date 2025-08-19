"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '@/assets/logo.svg'
import { NAV_LINKS, ROUTES } from '@/constants/routes.constants'
import { t } from '@/utils/i18n'

export default function Header({ pathname: pathnameProp }: { pathname?: string }) {
	const appRouterPathname = usePathname?.() as string | null
	const pathname = (pathnameProp ?? appRouterPathname ?? '') as string
	return (
		<header className="sticky top-0 z-20 bg-white border-b">
			<div className="w-full px-3 md:px-6 py-2 grid grid-cols-3 items-center" style={{ paddingBottom: 'unset' }}>
				<div className="flex justify-start">
					<Link href={ROUTES.home} aria-label="Nawy Home" className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-6">
						<Logo width={64} height={32} />
					</Link>
				</div>
				<nav className="text-[0.9rem] md:text-[0.95rem] flex justify-center">
					<ul className="flex gap-4 sm:gap-6 items-center">
						{NAV_LINKS.map((l) => {
							const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
							return (
								<li key={l.href}>
									<Link href={l.href} className={`px-2 sm:px-3 py-1 ${active ? 'text-primary-700' : 'text-gray-700 hover:text-primary-700'} border-b-2 ${active ? 'border-primary-700' : 'border-transparent hover:border-primary-400'}`}>
										{t(`nav.${l.label.toLowerCase()}`)}
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
				<div />
			</div>
		</header>
	)
}