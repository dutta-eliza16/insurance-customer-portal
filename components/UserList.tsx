"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "@/store/store";

import { setUsers, setLoading, setError } from "@/store/slices/userSlice";
import type { User } from "@/store/slices/userSlice";

function maskEmail(email: string): string {
	const [username, domain] = email.split("@");

	if (!username || !domain) {
		return "********";
	}

	if (username.length <= 2) {
		return `${username[0]}***@${domain}`;
	}

	return `${username[0]}${"*".repeat(
		username.length - 2,
	)}${username[username.length - 1]}@${domain}`;
}

export default function UserList() {
	const dispatch = useDispatch<AppDispatch>();

	const users = useSelector((state: RootState) => state.users.users);

	const loading = useSelector((state: RootState) => state.users.loading);

	const error = useSelector((state: RootState) => state.users.error);

	const [visibleEmails, setVisibleEmails] = useState<Record<number, boolean>>(
		{},
	);

	const toggleEmail = (userId: number) => {
		setVisibleEmails((current) => ({
			...current,
			[userId]: !current[userId],
		}));
	};

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				dispatch(setLoading(true));

				const response = await fetch("/api/users");

				if (!response.ok) {
					throw new Error("Failed to fetch users");
				}

				const data = await response.json();

				dispatch(setUsers(data));
			} catch (error) {
				console.error(error);
				dispatch(setError("Unable to load users."));
			} finally {
				dispatch(setLoading(false));
			}
		};

		fetchUsers();
	}, []);

	if (loading) {
		return <p>Loading users...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	if (users.length === 0) {
		return <p>No matching users found.</p>;
	}

	return (
		<section>
			<h2>Users List</h2>

			<div>
				{users.map((user) => (
					<div key={user.id}>
						<img
							src={user.avatar}
							alt={`${user.first_name} ${user.last_name}`}
							width={80}
							height={80}
						/>

						<h3>
							{user.first_name} {user.last_name}
						</h3>

						<p>{visibleEmails[user.id] ? user.email : maskEmail(user.email)}</p>

						<button type="button" onClick={() => toggleEmail(user.id)}>
							{visibleEmails[user.id] ? "Hide Email" : "Show Email"}
						</button>
					</div>
				))}
			</div>
		</section>
	);
}
