"use client";

import { CalendarProps } from "@/lib/types";
import { useState } from "react";

export default function Calendar({
	selectedDate,
	onDateSelect,
	minDate = new Date(),
}: CalendarProps) {
	const [currentMonth, setCurrentMonth] = useState(new Date());

	// Get the first day of the current month view
	const firstDayOfMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth(),
		1
	);
	const startingDayOfWeek = firstDayOfMonth.getDay();

	// Get the number of days in the current month
	const daysInMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth() + 1,
		0
	).getDate();

	// Get the number of days in the previous month
	const daysInPrevMonth = new Date(
		currentMonth.getFullYear(),
		currentMonth.getMonth(),
		0
	).getDate();

	// Generate calendar days
	const calendarDays = [];

	// Previous month's days
	for (let i = 0; i < startingDayOfWeek; i++) {
		const day = daysInPrevMonth - startingDayOfWeek + i + 1;
		const date = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() - 1,
			day
		);
		calendarDays.push({
			date,
			isCurrentMonth: false,
			isDisabled: date < minDate,
		});
	}

	// Current month's days
	for (let i = 1; i <= daysInMonth; i++) {
		const date = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth(),
			i
		);
		calendarDays.push({
			date,
			isCurrentMonth: true,
			isDisabled: date < minDate,
		});
	}

	// Next month's days to fill the grid (42 cells total for 6 weeks)
	const totalCells = 42; // 6 weeks * 7 days
	const nextMonthDays = totalCells - calendarDays.length;
	for (let i = 1; i <= nextMonthDays; i++) {
		const date = new Date(
			currentMonth.getFullYear(),
			currentMonth.getMonth() + 1,
			i
		);
		calendarDays.push({
			date,
			isCurrentMonth: false,
			isDisabled: date < minDate,
		});
	}

	const navigateMonth = (direction: "prev" | "next") => {
		const newMonth = new Date(currentMonth);
		if (direction === "prev") {
			newMonth.setMonth(newMonth.getMonth() - 1);
		} else {
			newMonth.setMonth(newMonth.getMonth() + 1);
		}
		setCurrentMonth(newMonth);
	};

	const isSameDay = (date1: Date, date2: Date) => {
		return (
			date1.getDate() === date2.getDate() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getFullYear() === date2.getFullYear()
		);
	};

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return (
		<div className="bg-white/50 dark:bg-gray-800/30 rounded-xl p-4 backdrop-blur-md">
			{/* Month Navigation */}
			<div className="flex items-center justify-between mb-4">
				<button
					onClick={() => navigateMonth("prev")}
					className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
					<svg
						className="w-5 h-5 text-gray-600 dark:text-gray-400"
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
				</button>

				<h3 className="text-lg font-semibold text-gray-800 dark:text-white">
					{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
				</h3>

				<button
					onClick={() => navigateMonth("next")}
					className="p-2 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
					<svg
						className="w-5 h-5 text-gray-600 dark:text-gray-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</button>
			</div>

			{/* Day Headers */}
			<div className="grid grid-cols-7 gap-1 mb-2">
				{dayNames.map((day) => (
					<div
						key={day}
						className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
						{day}
					</div>
				))}
			</div>

			{/* Calendar Grid */}
			<div className="grid grid-cols-7 gap-1">
				{calendarDays.map((day, index) => {
					const isSelected = selectedDate && isSameDay(day.date, selectedDate);
					const isToday = isSameDay(day.date, new Date());

					return (
						<button
							key={index}
							onClick={() => !day.isDisabled && onDateSelect(day.date)}
							disabled={day.isDisabled}
							className={`
                h-10 rounded-lg text-sm font-medium transition-all duration-200
                ${
									isSelected
										? "bg-blue-500 text-white shadow-lg scale-105"
										: isToday
										? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
										: day.isCurrentMonth
										? "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
										: "text-gray-400 dark:text-gray-600"
								}
                ${
									day.isDisabled
										? "opacity-40 cursor-not-allowed"
										: "hover:scale-105 cursor-pointer"
								}
              `}>
							{day.date.getDate()}
						</button>
					);
				})}
			</div>
		</div>
	);
}
