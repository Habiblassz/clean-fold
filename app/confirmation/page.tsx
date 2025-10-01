"use client";

import Link from "next/link";

export default function ConfirmationPage() {
	return (
		<div className="relative flex min-h-screen flex-col">
			{/* Header */}
			<header className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
				<div className="flex items-center p-4">
					<Link
						href="/tracking"
						className="flex h-10 w-10 items-center justify-center rounded-full text-gray-600 dark:text-gray-300">
						<span className="material-symbols-outlined">arrow_back</span>
					</Link>
					<h1 className="flex-1 text-center text-lg font-bold text-gray-900 dark:text-white">
						Delivery Complete
					</h1>
					<div className="h-10 w-10"></div>
				</div>
			</header>

			<main className="flex-grow overflow-y-auto px-4 pb-24 pt-4">
				{/* Hero Section */}
				<div className="relative mb-6 overflow-hidden rounded-xl shadow-lg">
					<div className="aspect-[4/3] w-full bg-gradient-to-br from-primary/30 to-background-dark/70 flex items-center justify-center">
						<div className="text-center text-white">
							<div className="text-6xl mb-4">🎉</div>
							<h2 className="text-3xl font-bold mb-2">Delivered!</h2>
							<p className="max-w-prose text-sm text-gray-200">
								Your fresh laundry has arrived. We hope you enjoy the crisp,
								clean results.
							</p>
						</div>
					</div>
				</div>

				{/* Rating Section */}
				<div className="rounded-xl border border-gray-200/10 bg-background-light/50 dark:bg-background-dark/50 p-6 backdrop-blur-lg">
					<h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
						Rate Your Experience
					</h3>
					<div className="flex flex-wrap items-center gap-6">
						<div className="flex flex-col items-center">
							<p className="text-5xl font-bold text-primary">4.8</p>
							<div className="my-1 flex text-primary">
								{[...Array(4)].map((_, i) => (
									<span key={i} className="material-symbols-outlined !text-xl">
										star
									</span>
								))}
								<span className="material-symbols-outlined !text-xl text-gray-400 dark:text-gray-600">
									star_half
								</span>
							</div>
							<p className="text-xs text-gray-500 dark:text-gray-400">
								Based on 125 reviews
							</p>
						</div>
						<div className="flex-1 space-y-2">
							{[
								{ stars: 5, percentage: 70 },
								{ stars: 4, percentage: 20 },
								{ stars: 3, percentage: 5 },
								{ stars: 2, percentage: 3 },
								{ stars: 1, percentage: 2 },
							].map((rating) => (
								<div
									key={rating.stars}
									className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 text-xs">
									<span className="text-gray-500 dark:text-gray-400">
										{rating.stars}
									</span>
									<div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700">
										<div
											className="h-1.5 rounded-full bg-primary"
											style={{ width: `${rating.percentage}%` }}></div>
									</div>
									<span className="font-medium text-gray-600 dark:text-gray-300">
										{rating.percentage}%
									</span>
								</div>
							))}
						</div>
					</div>
					<div className="mt-6">
						<textarea
							className="w-full rounded-lg border-gray-300 bg-background-light dark:border-gray-700 dark:bg-background-dark/80 p-3 text-sm text-gray-800 placeholder-gray-400 dark:text-gray-200 focus:border-primary focus:ring-primary"
							placeholder="Leave a review (optional)"
							rows={4}
						/>
					</div>
				</div>

				{/* Action Buttons */}
				<div className="mt-6 space-y-3">
					<button className="flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3.5 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105">
						Submit Review
					</button>
					<Link
						href="/services"
						className="flex w-full items-center justify-center rounded-xl bg-primary/20 dark:bg-primary/30 px-4 py-3.5 text-base font-bold text-primary transition-colors hover:bg-primary/30 dark:hover:bg-primary/40">
						Reorder Last Service
					</Link>
				</div>
			</main>
		</div>
	);
}
