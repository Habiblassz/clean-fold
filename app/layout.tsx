import "./globals.css";
import type { Metadata } from "next";
import { OrderProvider } from "@/contexts/OrderContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminProvider } from "@/contexts/AdminContext";

export const metadata: Metadata = {
	title: "FreshFold - Premium Laundry Care",
	description:
		"Experience laundry care reimagined with our premium, eco-friendly service",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="h-full">
			<head>
				<link
					href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className="h-full antialiased">
				<AuthProvider>
					<AdminProvider>
						<OrderProvider>{children}</OrderProvider>
					</AdminProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
