"use client";

import { signOut } from "next-auth/react";

interface HeaderProps {
	title?: string;
	showLogout?: boolean;
}

export default function Header({
	title = "Insurance Customer Portal",
	showLogout = true,
}: HeaderProps) {
	return (
		<header
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				padding: "16px 24px",
				borderBottom: "1px solid #ddd",
			}}
		>
			<h1>{title}</h1>

			{showLogout && (
				<button onClick={() => signOut({ callbackUrl: "/login" })}>
					Sign Out
				</button>
			)}
		</header>
	);
}
