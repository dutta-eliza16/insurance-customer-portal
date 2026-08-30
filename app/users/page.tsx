import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserList from "@/components/UserList";

export default async function UsersPage() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	return (
		<>
			<Header title="Insurance Customer Portal" />

			<main
				style={{
					padding: "24px",
					minHeight: "70vh",
				}}
			>
				<p>Welcome, {session.user?.name}</p>

				<UserList />
			</main>

			<Footer />
		</>
	);
}
