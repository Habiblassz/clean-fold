"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrder, Service } from "@/contexts/OrderContext";

const defaultServices: Service[] = [
	{
		id: "1",
		name: "Wash & Fold",
		description:
			"Professional washing and neat folding for your everyday laundry",
		price: 1.5,
		unit: "lb",
		icon: "🧺",
		features: ["Same-day service", "Eco-friendly detergent", "Soft folding"],
		quantity: 0,
	},
	{
		id: "2",
		name: "Dry Cleaning",
		description: "Expert care for your delicate and special occasion garments",
		price: 7.0,
		unit: "item",
		icon: "👔",
		features: ["Stain treatment", "Professional pressing", "Garment bag"],
		quantity: 0,
	},
	{
		id: "3",
		name: "Ironing",
		description: "Crisp, professional finishing for wrinkle-free clothes",
		price: 3.0,
		unit: "item",
		icon: "🔥",
		features: ["Steam ironing", "Hanger ready", "Same-day service"],
		quantity: 0,
	},
];

export default function ServicesPage() {
	const { order, updateServices, updateEcoFriendly } = useOrder();
	const [services, setServices] = useState<Service[]>(
		order.services.length > 0 ? order.services : defaultServices
	);

	const updateQuantity = (id: string, change: number) => {
		const updatedServices = services.map((service) =>
			service.id === id
				? { ...service, quantity: Math.max(0, service.quantity + change) }
				: service
		);
		setServices(updatedServices);
		updateServices(updatedServices);
	};

	const totalItems = services.reduce(
		(sum, service) => sum + service.quantity,
		0
	);
	const totalPrice = services.reduce(
		(sum, service) => sum + service.price * service.quantity,
		0
	);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-24">
			{/* Header */}
			<header className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-20">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<Link
							href="/"
							className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
							<svg
								className="w-5 h-5"
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
							<span className="font-medium">Back</span>
						</Link>
						<h1 className="text-2xl font-bold text-gray-800 dark:text-white">
							Choose Services
						</h1>
						<div className="w-20"></div>
					</div>
				</div>
			</header>

			<main className="max-w-4xl mx-auto px-6 py-8">
				{/* Services Grid */}
				<div className="grid gap-6 mb-8">
					{services.map((service, index) => (
						<ServiceCard
							key={service.id}
							service={service}
							onUpdateQuantity={updateQuantity}
							delay={index * 0.1}
						/>
					))}
				</div>

				{/* Eco-friendly Option */}
				<div
					className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 mb-8 transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-white/80 dark:hover:bg-gray-800/70 animate-slide-up"
					style={{ animationDelay: "0.4s" }}>
					<label className="flex items-center gap-4 cursor-pointer">
						<div className="relative">
							<input
								type="checkbox"
								checked={order.ecoFriendly}
								onChange={(e) => updateEcoFriendly(e.target.checked)}
								className="sr-only"
							/>
							<div
								className={`w-12 h-6 rounded-full transition-colors duration-300 ${
									order.ecoFriendly
										? "bg-blue-500"
										: "bg-gray-300 dark:bg-gray-600"
								}`}>
								<div
									className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${
										order.ecoFriendly ? "transform translate-x-6" : ""
									}`}></div>
							</div>
						</div>
						<div className="flex-1">
							<h3 className="font-semibold text-gray-800 dark:text-white mb-1">
								Eco-friendly Service
							</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Use sustainable detergents and energy-efficient methods (+10%)
							</p>
						</div>
						<div className="text-2xl">🌍</div>
					</label>
				</div>
			</main>

			{/* Fixed Footer */}
			<footer className="fixed bottom-0 left-0 right-0 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
				<div className="max-w-4xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between mb-4">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								${(totalPrice * (order.ecoFriendly ? 1.1 : 1)).toFixed(2)}
							</p>
						</div>
						<Link
							href="/schedule"
							className={`bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg ${
								totalItems === 0 ? "opacity-50 cursor-not-allowed" : ""
							}`}
							onClick={(e) => totalItems === 0 && e.preventDefault()}>
							Continue {totalItems > 0 && `(${totalItems})`}
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}

function ServiceCard({
	service,
	onUpdateQuantity,
	delay,
}: {
	service: Service;
	onUpdateQuantity: (id: string, change: number) => void;
	delay: number;
}) {
	return (
		<div
			className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:scale-105 hover:bg-white/80 dark:hover:bg-gray-800/70 animate-slide-up"
			style={{ animationDelay: `${delay}s` }}>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4 flex-1">
					<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-2xl">
						{service.icon}
					</div>
					<div className="flex-1">
						<div className="flex items-start justify-between mb-2">
							<div>
								<h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
									{service.name}
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-3">
									{service.description}
								</p>
							</div>
							<p className="text-2xl font-bold text-blue-600">
								${service.price.toFixed(2)}
								<span className="text-sm font-normal text-gray-500">
									/{service.unit}
								</span>
							</p>
						</div>

						<div className="flex flex-wrap gap-2 mb-4">
							{service.features.map((feature, index) => (
								<span
									key={index}
									className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
									{feature}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Quantity Controls */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<button
						onClick={() => onUpdateQuantity(service.id, -1)}
						className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-30"
						disabled={service.quantity === 0}>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M20 12H4"
							/>
						</svg>
					</button>
					<span className="text-xl font-semibold text-gray-800 dark:text-white min-w-8 text-center">
						{service.quantity}
					</span>
					<button
						onClick={() => onUpdateQuantity(service.id, 1)}
						className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition-colors">
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 4v16m8-8H4"
							/>
						</svg>
					</button>
				</div>

				<div className="text-right">
					<p className="text-lg font-semibold text-gray-800 dark:text-white">
						${(service.price * service.quantity).toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
}
