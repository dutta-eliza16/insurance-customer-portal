"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
	const handleGoogleLogin = () => {
		signIn("google", {
			callbackUrl: "/users",
		});
	};

	return (
		<main>
			<h1>Zurich Customer Portal</h1>

			<p>Please sign in to access your account.</p>

			<button onClick={handleGoogleLogin}>Continue with Google</button>
		</main>
	);
}
