"use client";

import Link from "next/link";
import { useOrder } from "@/contexts/OrderContext";

export default function TrackingPage() {
	const { order } = useOrder();

	if (
		!order.schedule ||
		order.services.filter((s) => s.quantity > 0).length === 0
	) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
				<div className="text-center">
					<h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
						No Order Found
					</h1>
					<Link
						href="/services"
						className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base">
						Start New Order
					</Link>
				</div>
			</div>
		);
	}

	const orderItems = order.services.filter((service) => service.quantity > 0);
	const subtotal = orderItems.reduce(
		(sum, service) => sum + service.price * service.quantity,
		0
	);
	const ecoFee = order.ecoFriendly ? subtotal * 0.1 : 0;
	const total = subtotal + ecoFee - order.discount;

	// Format date for display
	const formatDisplayDate = (date: Date) => {
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		if (date.toDateString() === today.toDateString()) {
			return "Today";
		} else if (date.toDateString() === tomorrow.toDateString()) {
			return "Tomorrow";
		} else {
			return date.toLocaleDateString("en-US", {
				weekday: "short",
				month: "short",
				day: "numeric",
			});
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 sm:pb-24">
			{/* Header */}
			<header className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
					<div className="flex items-center justify-between">
						<Link
							href="/summary"
							className="flex items-center gap-2 sm:gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
							<svg
								className="w-4 h-4 sm:w-5 sm:h-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
							<span className="font-medium text-sm sm:text-base">Back</span>
						</Link>
						<h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
							Order #12345
						</h1>
						<div className="w-12 sm:w-20"></div>
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
				{/* Progress Card */}
				<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-scale-in">
					<div className="flex items-center justify-between mb-3 sm:mb-4">
						<div>
							<h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
								Order Confirmed
							</h2>
							<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
								We&apos;re preparing your laundry
							</p>
						</div>
						<div className="text-right">
							<div className="text-lg sm:text-2xl font-bold text-blue-600">
								25%
							</div>
							<div className="text-xs text-gray-500 dark:text-gray-400">
								Complete
							</div>
						</div>
					</div>
					<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3">
						<div
							className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-500"
							style={{ width: "25%" }}></div>
					</div>
					<div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
						<span>Confirmed</span>
						<span>In Progress</span>
						<span>Ready</span>
						<span>Delivered</span>
					</div>
				</div>

				{/* Order Summary */}
				<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-up">
					<h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
						Your Order
					</h2>
					<div className="space-y-3">
						{orderItems.map((service) => (
							<div
								key={service.id}
								className="flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-sm sm:text-lg">
										{service.icon}
									</div>
									<div>
										<h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
											{service.name}
										</h3>
										<p className="text-xs text-gray-600 dark:text-gray-400">
											{service.quantity} {service.unit}
										</p>
									</div>
								</div>
								<span className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
									${(service.price * service.quantity).toFixed(2)}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Schedule Details */}
				<div
					className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 animate-slide-up"
					style={{ animationDelay: "0.1s" }}>
					<h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
						Delivery Details
					</h2>
					<div className="space-y-3 sm:space-y-4">
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
								Pickup
							</span>
							<span className="font-semibold text-gray-800 dark:text-white text-right text-sm sm:text-base">
								{formatDisplayDate(order.schedule.pickup.date)}
								<br />
								<span className="text-blue-600">
									{order.schedule.pickup.time}
								</span>
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
								Delivery
							</span>
							<span className="font-semibold text-gray-800 dark:text-white text-right text-sm sm:text-base">
								{formatDisplayDate(order.schedule.delivery.date)}
								<br />
								<span className="text-purple-600">
									{order.schedule.delivery.time}
								</span>
							</span>
						</div>
						<div className="flex justify-between">
							<span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
								Service Type
							</span>
							<span className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
								{order.ecoFriendly ? "Eco-friendly" : "Standard"}
							</span>
						</div>
						<div className="border-t border-gray-200 dark:border-gray-600 pt-3 sm:pt-4 flex justify-between">
							<span className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
								Total
							</span>
							<span className="text-lg sm:text-xl font-bold text-blue-600">
								${total.toFixed(2)}
							</span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
