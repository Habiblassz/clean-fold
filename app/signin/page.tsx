"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockUsers, useAuth } from "@/contexts/AuthContext";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const { login, isLoading } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}

		const success = await login(email, password);

		if (success) {
			const currentUser = mockUsers.find((u) => u.email === email);
			if (
				currentUser &&
				currentUser.password === password &&
				currentUser.role === "admin"
			) {
				router.push("/admin/dashboard");
			} else {
				router.push("/services");
			}
		} else {
			setError(
				'Invalid email or password. Try: customer@freshfold.com or admin@freshfold.com with password "password"'
			);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
			{/* Background Elements - Mobile Adjusted */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-20 -right-20 w-40 h-40 sm:-top-40 sm:-right-40 sm:w-80 sm:h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-float"></div>
				<div
					className="absolute -bottom-20 -left-20 w-40 h-40 sm:-bottom-40 sm:-left-40 sm:w-80 sm:h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float"
					style={{ animationDelay: "2s" }}></div>
			</div>

			<div className="relative z-10 w-full max-w-md mx-4">
				{/* Header */}
				<div className="text-center mb-6 sm:mb-8">
					<Link href="/" className="inline-block mb-4 sm:mb-6">
						<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
							<svg
								className="w-6 h-6 sm:w-8 sm:h-8 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
								/>
							</svg>
						</div>
					</Link>
					<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
						Welcome Back
					</h1>
					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
						Sign in to your FreshFold account
					</p>
				</div>

				{/* Sign In Form */}
				<form
					onSubmit={handleSubmit}
					className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-soft">
					{error && (
						<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 sm:p-4 mb-4">
							<p className="text-red-700 dark:text-red-300 text-xs sm:text-sm">
								{error}
							</p>
						</div>
					)}

					<div className="space-y-4">
						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Email Address
							</label>
							<input
								type="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-3 sm:px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
								placeholder="your@email.com"
								required
							/>
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-3 sm:px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
								placeholder="••••••••"
								required
							/>
						</div>
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						disabled={isLoading}
						className={`w-full mt-4 sm:mt-6 py-3 sm:py-4 px-6 rounded-xl text-white font-semibold shadow-lg transition-all duration-300 text-sm sm:text-base ${
							isLoading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-xl hover:scale-105"
						}`}>
						{isLoading ? (
							<div className="flex items-center justify-center">
								<div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
								Signing In...
							</div>
						) : (
							"Sign In"
						)}
					</button>

					{/* Sign Up Link */}
					<p className="text-center mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
						Don&apos;t have an account?{" "}
						<Link
							href="/signup"
							className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
