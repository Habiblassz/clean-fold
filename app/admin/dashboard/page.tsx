"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ServicesManagement from "./serviceManagement";
import DriversManagement from "./driverManagment";
import CustomersManagement from "./customerManagement";
import OrderManagement from "./orderManagement";
import OverviewManagement from "./overviewManagement";

export default function AdminDashboard() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState("overview");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		if (!user || user.role !== "admin") {
			router.push("/signin");
		}
	}, [user, router]);

	if (!user || user.role !== "admin") {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
				<div className="text-center">
					<div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<svg
							className="w-6 h-6 sm:w-8 sm:h-8 text-white"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
					</div>
					<h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
						Access Denied
					</h1>
					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6">
						Please sign in as an administrator
					</p>
					<Link
						href="/signin"
						className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
						Sign In
					</Link>
				</div>
			</div>
		);
	}
	if (user && user.role === "admin") {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
				{/* Header */}
				<header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
					<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
						<div className="flex justify-between items-center py-3 sm:py-4">
							<div className="flex items-center space-x-2 sm:space-x-4">
								<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
									<svg
										className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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
								<div>
									<h1 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
										FreshFold <span className="text-blue-600">Admin</span>
									</h1>
									<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										Business Dashboard
									</p>
								</div>
							</div>

							<div className="flex items-center space-x-2 sm:space-x-4">
								<div className="text-right hidden sm:block">
									<p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
										{user.name}
									</p>
									<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										Administrator
									</p>
								</div>
								<button
									onClick={logout}
									className="bg-red-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg hover:bg-red-600 transition-colors text-xs sm:text-sm">
									Logout
								</button>
								<button
									onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
									className="sm:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 6h16M4 12h16M4 18h16"
										/>
									</svg>
								</button>
							</div>
						</div>

						{/* Mobile Navigation Menu */}
						{isMobileMenuOpen && (
							<div className="sm:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-2">
								<div className="flex flex-col space-y-2 px-3 mb-4">
									<p className="font-semibold text-gray-800 dark:text-white text-sm">
										{user.name}
									</p>
									<p className="text-xs text-gray-600 dark:text-gray-400">
										Administrator
									</p>
								</div>
								{[
									{ id: "overview", name: "Overview" },
									{ id: "orders", name: "Orders" },
									{ id: "services", name: "Services" },
									{ id: "drivers", name: "Drivers" },
									{ id: "customers", name: "Customers" },
								].map((tab) => (
									<button
										key={tab.id}
										onClick={() => {
											setActiveTab(tab.id);
											setIsMobileMenuOpen(false);
										}}
										className={`w-full text-left py-3 px-4 font-medium text-sm ${
											activeTab === tab.id
												? "bg-blue-50 text-blue-600 border-r-2 border-blue-500"
												: "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
										}`}>
										{tab.name}
									</button>
								))}
							</div>
						)}

						{/* Desktop Navigation Tabs */}
						<div className="hidden sm:flex space-x-4 lg:space-x-8 border-b border-gray-200 dark:border-gray-700">
							{[
								{ id: "overview", name: "Overview" },
								{ id: "orders", name: "Orders" },
								{ id: "services", name: "Services" },
								{ id: "drivers", name: "Drivers" },
								{ id: "customers", name: "Customers" },
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`py-3 px-1 border-b-2 font-medium text-sm ${
										activeTab === tab.id
											? "border-blue-500 text-blue-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
									}`}>
									{tab.name}
								</button>
							))}
						</div>
					</div>
				</header>

				<div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
					{/* Overview Tab */}
					{activeTab === "overview" && <OverviewManagement />}

					{/* Orders Tab */}
					{activeTab === "orders" && <OrderManagement />}

					{/* Services Tab */}
					{activeTab === "services" && <ServicesManagement />}

					{/* Drivers Tab */}
					{activeTab === "drivers" && <DriversManagement />}

					{/* Customers Tab */}
					{activeTab === "customers" && <CustomersManagement />}
				</div>
			</div>
		);
	}
}
