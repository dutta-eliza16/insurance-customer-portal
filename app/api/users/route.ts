import { NextResponse } from "next/server";

export async function GET() {
	try {
		let page = 1;
		let totalPages = 1;

		const allUsers = [];

		while (page <= totalPages) {
			const response = await fetch(`https://reqres.in/api/users?page=${page}`);

			if (!response.ok) {
				throw new Error(`Failed to fetch page ${page}`);
			}

			const data = await response.json();

			allUsers.push(...data.data);

			totalPages = data.total_pages;

			page++;
		}

		const filteredUsers = allUsers.filter(
			(user: { first_name: string; last_name: string }) =>
				user.first_name.toLowerCase().startsWith("g") ||
				user.last_name.toLowerCase().startsWith("w"),
		);

		return NextResponse.json(filteredUsers);
	} catch (error) {
		console.error("Users API error:", error);

		return NextResponse.json(
			{
				message: "Unable to fetch users",
			},
			{
				status: 500,
			},
		);
	}
}
