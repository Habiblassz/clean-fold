"use client";

import { useState } from "react";
import Link from "next/link";
import { useOrder } from "@/contexts/OrderContext";
import Calendar from "@/components/Calendar";
import { formatDate, addDays } from "@/lib/dateUtils";

export default function SchedulePage() {
	const { order, updateSchedule } = useOrder();

	// Set default dates: pickup today, delivery tomorrow
	const defaultPickupDate = new Date();
	const defaultDeliveryDate = addDays(new Date(), 1);

	const [selectedPickupDate, setSelectedPickupDate] = useState<Date>(
		order.schedule?.pickup.date || defaultPickupDate
	);
	const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<Date>(
		order.schedule?.delivery.date || defaultDeliveryDate
	);
	const [selectedPickupTime, setSelectedPickupTime] = useState(
		order.schedule?.pickup.time || "11:00 AM"
	);
	const [selectedDeliveryTime, setSelectedDeliveryTime] = useState(
		order.schedule?.delivery.time || "06:00 PM"
	);

	const handleConfirmSchedule = () => {
		const schedule = {
			pickup: {
				date: selectedPickupDate,
				time: selectedPickupTime,
			},
			delivery: {
				date: selectedDeliveryDate,
				time: selectedDeliveryTime,
			},
		};
		updateSchedule(schedule);
	};

	const pickupTimeSlots = [
		"08:00 AM",
		"09:00 AM",
		"10:00 AM",
		"11:00 AM",
		"12:00 PM",
		"01:00 PM",
		"02:00 PM",
		"03:00 PM",
		"04:00 PM",
	];

	const deliveryTimeSlots = [
		"10:00 AM",
		"11:00 AM",
		"12:00 PM",
		"01:00 PM",
		"02:00 PM",
		"03:00 PM",
		"04:00 PM",
		"05:00 PM",
		"06:00 PM",
		"07:00 PM",
		"08:00 PM",
	];

	// Delivery date must be after pickup date
	const deliveryMinDate = addDays(selectedPickupDate, 1);

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pb-24">
			{/* Header */}
			<header className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-20">
				<div className="max-w-6xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<Link
							href="/services"
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
							Schedule Pickup & Delivery
						</h1>
						<div className="w-20"></div>
					</div>
				</div>
			</header>

			<main className="max-w-6xl mx-auto px-6 py-8">
				<div className="grid lg:grid-cols-2 gap-8">
					{/* Pickup Section */}
					<div className="animate-slide-up">
						<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 mb-6">
							<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
								📦 Pickup Date & Time
							</h2>

							{/* Selected Date Display */}
							<div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-4 text-center">
								<p className="text-lg font-semibold text-blue-600">
									{formatDate(selectedPickupDate)}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{selectedPickupDate.toLocaleDateString("en-US", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>

							{/* Calendar */}
							<Calendar
								selectedDate={selectedPickupDate}
								onDateSelect={setSelectedPickupDate}
								minDate={new Date()}
							/>
						</div>

						{/* Pickup Time Slots */}
						<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6">
							<h3 className="font-semibold text-gray-800 dark:text-white mb-4">
								Select Pickup Time
							</h3>
							<div className="grid grid-cols-3 gap-3">
								{pickupTimeSlots.map((time) => (
									<button
										key={time}
										type="button"
										onClick={() => setSelectedPickupTime(time)}
										className={`py-3 rounded-lg transition-all duration-300 ${
											selectedPickupTime === time
												? "bg-blue-500 text-white shadow-lg scale-105"
												: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"
										}`}>
										{time}
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Delivery Section */}
					<div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
						<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 mb-6">
							<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
								🚗 Delivery Date & Time
							</h2>

							{/* Selected Date Display */}
							<div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 mb-4 text-center">
								<p className="text-lg font-semibold text-purple-600">
									{formatDate(selectedDeliveryDate)}
								</p>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									{selectedDeliveryDate.toLocaleDateString("en-US", {
										weekday: "long",
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</p>
							</div>

							{/* Calendar */}
							<Calendar
								selectedDate={selectedDeliveryDate}
								onDateSelect={setSelectedDeliveryDate}
								minDate={deliveryMinDate}
							/>
						</div>

						{/* Delivery Time Slots */}
						<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6">
							<h3 className="font-semibold text-gray-800 dark:text-white mb-4">
								Select Delivery Time
							</h3>
							<div className="grid grid-cols-3 gap-3">
								{deliveryTimeSlots.map((time) => (
									<button
										key={time}
										type="button"
										onClick={() => setSelectedDeliveryTime(time)}
										className={`py-3 rounded-lg transition-all duration-300 ${
											selectedDeliveryTime === time
												? "bg-purple-500 text-white shadow-lg scale-105"
												: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30"
										}`}>
										{time}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Schedule Summary */}
				<div className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-2xl p-6 mt-8 animate-scale-in">
					<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
						Schedule Summary
					</h2>
					<div className="grid md:grid-cols-2 gap-6">
						<div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
							<div className="text-2xl mb-2">📦</div>
							<h3 className="font-semibold text-gray-800 dark:text-white">
								Pickup
							</h3>
							<p className="text-lg font-bold text-blue-600">
								{formatDate(selectedPickupDate)}
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								{selectedPickupTime}
							</p>
						</div>
						<div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
							<div className="text-2xl mb-2">🚗</div>
							<h3 className="font-semibold text-gray-800 dark:text-white">
								Delivery
							</h3>
							<p className="text-lg font-bold text-purple-600">
								{formatDate(selectedDeliveryDate)}
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								{selectedDeliveryTime}
							</p>
						</div>
					</div>
				</div>
			</main>

			{/* Fixed Footer */}
			<footer className="fixed bottom-0 left-0 right-0 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
				<div className="max-w-6xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Ready to schedule?
							</p>
							<p className="text-lg font-semibold text-gray-800 dark:text-white">
								{formatDate(selectedPickupDate)} {selectedPickupTime} →{" "}
								{formatDate(selectedDeliveryDate)} {selectedDeliveryTime}
							</p>
						</div>
						<Link
							href="/summary"
							onClick={handleConfirmSchedule}
							className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 text-lg">
							Confirm Schedule
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
