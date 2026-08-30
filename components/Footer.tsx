interface FooterProps {
	text?: string;
}

export default function Footer({
	text = "© 2026 Insurance Customer Portal",
}: FooterProps) {
	return (
		<footer
			style={{
				marginTop: "40px",
				padding: "16px 24px",
				borderTop: "1px solid #ddd",
				textAlign: "center",
			}}
		>
			<p>{text}</p>
		</footer>
	);
}
