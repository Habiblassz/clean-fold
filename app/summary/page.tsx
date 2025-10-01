"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrder } from "@/contexts/OrderContext";

export default function SummaryPage() {
	const { order, updatePromoCode } = useOrder();
	const [promoCode, setPromoCode] = useState(order.promoCode || "");

	if (!order.schedule) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4">
				<div className="text-center">
					<h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-4">
						No Schedule Selected
					</h1>
					<Link href="/schedule" className="btn-primary text-sm sm:text-base">
						Go to Schedule
					</Link>
				</div>
			</div>
		);
	}

	const subtotal = order.services.reduce(
		(sum, service) => sum + service.price * service.quantity,
		0
	);
	const ecoFee = order.ecoFriendly ? subtotal * 0.1 : 0;
	const total = subtotal + ecoFee - order.discount;

	const handleApplyPromo = () => {
		updatePromoCode(promoCode);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-20 sm:pb-24">
			{/* Header */}
			<header className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-20">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
					<div className="flex items-center justify-between">
						<Link
							href="/schedule"
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
							Order Summary
						</h1>
						<div className="w-12 sm:w-20"></div>
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
				{/* Order Items */}
				<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-scale-in">
					<h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
						Order Details
					</h2>
					<div className="space-y-3 sm:space-y-4">
						{order.services
							.filter((service) => service.quantity > 0)
							.map((service) => (
								<div
									key={service.id}
									className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
									<div>
										<h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
											{service.name}
										</h3>
										<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
											{service.quantity} {service.unit} • $
											{service.price.toFixed(2)}/{service.unit}
										</p>
									</div>
									<span className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
										${(service.price * service.quantity).toFixed(2)}
									</span>
								</div>
							))}
					</div>
				</div>

				{/* Schedule Summary */}
				<div
					className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-up"
					style={{ animationDelay: "0.1s" }}>
					<h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
						Schedule
					</h2>
					<div className="grid grid-cols-2 gap-3 sm:gap-4">
						<div className="text-center p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
							<div className="text-xl sm:text-2xl mb-2">📦</div>
							<h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
								Pickup
							</h3>
							<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
								{order.schedule.pickup.date.toLocaleDateString("en-US", {
									weekday: "long",
									month: "long",
									day: "numeric",
								})}
							</p>
							<p className="text-base sm:text-lg font-bold text-blue-600">
								{order.schedule.pickup.time}
							</p>
						</div>
						<div className="text-center p-3 sm:p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
							<div className="text-xl sm:text-2xl mb-2">🚗</div>
							<h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
								Delivery
							</h3>
							<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
								{order.schedule.delivery.date.toLocaleDateString("en-US", {
									weekday: "long",
									month: "long",
									day: "numeric",
								})}
							</p>
							<p className="text-base sm:text-lg font-bold text-purple-600">
								{order.schedule.delivery.time}
							</p>
						</div>
					</div>
				</div>

				{/* Promo Code */}
				<div
					className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-up"
					style={{ animationDelay: "0.2s" }}>
					<h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
						Promo Code
					</h2>
					<div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
						<input
							type="text"
							value={promoCode}
							onChange={(e) => setPromoCode(e.target.value)}
							placeholder="Enter promo code"
							className="flex-1 p-3 sm:p-4 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
						/>
						<button
							onClick={handleApplyPromo}
							className="bg-blue-500 text-white px-4 sm:px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold text-sm sm:text-base">
							Apply
						</button>
					</div>
					{order.promoCode && (
						<p className="text-green-600 mt-2 text-xs sm:text-sm">
							Promo code {order.promoCode} applied! ${order.discount.toFixed(2)}{" "}
							discount.
						</p>
					)}
				</div>

				{/* Total */}
				<div
					className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-4 sm:p-6 animate-slide-up"
					style={{ animationDelay: "0.3s" }}>
					<div className="space-y-2 sm:space-y-3">
						<div className="flex justify-between text-gray-600 dark:text-gray-400 text-sm sm:text-base">
							<span>Subtotal</span>
							<span>${subtotal.toFixed(2)}</span>
						</div>
						{order.ecoFriendly && (
							<div className="flex justify-between text-green-600 text-sm sm:text-base">
								<span>Eco-friendly service</span>
								<span>+${ecoFee.toFixed(2)}</span>
							</div>
						)}
						{order.discount > 0 && (
							<div className="flex justify-between text-green-600 text-sm sm:text-base">
								<span>Discount</span>
								<span>-${order.discount.toFixed(2)}</span>
							</div>
						)}
						<div className="border-t border-gray-200 dark:border-gray-600 pt-2 sm:pt-3">
							<div className="flex justify-between text-base sm:text-lg font-bold text-gray-800 dark:text-white">
								<span>Total</span>
								<span>${total.toFixed(2)}</span>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Fixed Footer */}
			<footer className="fixed bottom-0 left-0 right-0 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
						<div>
							<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
								Total Amount
							</p>
							<p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
								${total.toFixed(2)}
							</p>
						</div>
						<Link
							href="/tracking"
							className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-lg w-full sm:w-auto text-center">
							Confirm & Pay
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
