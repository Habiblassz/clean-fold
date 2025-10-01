"use client";

import Link from "next/link";

export default function ConfirmationPage() {
	return (
		<div className="relative flex min-h-screen flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
			{/* Header */}
			<header className="sticky top-0 z-10 bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
				<div className="flex items-center p-4">
					<Link
						href="/tracking"
						className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-gray-600 dark:text-gray-300">
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
					</Link>
					<h1 className="flex-1 text-center text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
						Delivery Complete
					</h1>
					<div className="h-8 w-8 sm:h-10 sm:w-10"></div>
				</div>
			</header>

			<main className="flex-grow overflow-y-auto px-4 pb-20 sm:pb-24 pt-4">
				{/* Hero Section */}
				<div className="relative mb-4 sm:mb-6 overflow-hidden rounded-xl shadow-lg">
					<div className="aspect-[4/3] w-full bg-gradient-to-br from-blue-500/30 to-purple-500/70 flex items-center justify-center">
						<div className="text-center text-white p-4">
							<div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
							<h2 className="text-2xl sm:text-3xl font-bold mb-2">
								Delivered!
							</h2>
							<p className="max-w-prose text-xs sm:text-sm text-gray-200">
								Your fresh laundry has arrived. We hope you enjoy the crisp,
								clean results.
							</p>
						</div>
					</div>
				</div>

				{/* Rating Section */}
				<div className="rounded-xl border border-gray-200/10 bg-white/70 dark:bg-gray-800/50 p-4 sm:p-6 backdrop-blur-lg mb-4 sm:mb-6">
					<h3 className="mb-3 sm:mb-4 text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
						Rate Your Experience
					</h3>
					<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
						<div className="flex flex-col items-center">
							<p className="text-3xl sm:text-5xl font-bold text-blue-600">
								4.8
							</p>
							<div className="my-1 sm:my-2 flex text-yellow-400">
								{[...Array(4)].map((_, i) => (
									<svg
										key={i}
										className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
										viewBox="0 0 20 20">
										<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
									</svg>
								))}
								<svg
									className="w-5 h-5 sm:w-6 sm:h-6 fill-gray-300 dark:fill-gray-600"
									viewBox="0 0 20 20">
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Based on 125 reviews
							</p>
						</div>
						<div className="flex-1 w-full space-y-2">
							{[
								{ stars: 5, percentage: 70 },
								{ stars: 4, percentage: 20 },
								{ stars: 3, percentage: 5 },
								{ stars: 2, percentage: 3 },
								{ stars: 1, percentage: 2 },
							].map((rating) => (
								<div
									key={rating.stars}
									className="grid grid-cols-[auto_1fr_auto] items-center gap-x-2 sm:gap-x-3 text-xs">
									<span className="text-gray-500 dark:text-gray-400 text-xs">
										{rating.stars}
									</span>
									<div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
										<div
											className="h-1.5 rounded-full bg-blue-500"
											style={{ width: `${rating.percentage}%` }}></div>
									</div>
									<span className="font-medium text-gray-600 dark:text-gray-300 text-xs">
										{rating.percentage}%
									</span>
								</div>
							))}
						</div>
					</div>
					<div className="mt-4 sm:mt-6">
						<textarea
							className="w-full rounded-lg border-gray-300 bg-white/50 dark:bg-gray-700/50 border dark:border-gray-700 p-3 text-sm text-gray-800 placeholder-gray-400 dark:text-gray-200 focus:border-blue-500 focus:ring-blue-500"
							placeholder="Leave a review (optional)"
							rows={3}
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="space-y-3">
					<button className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105">
						Submit Review
					</button>
					<Link
						href="/services"
						className="flex w-full items-center justify-center rounded-xl bg-blue-500/20 dark:bg-blue-500/30 px-4 py-3.5 text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400 transition-colors hover:bg-blue-500/30 dark:hover:bg-blue-500/40">
						Reorder Last Service
					</Link>
				</div>
			</main>
		</div>
	);
}
