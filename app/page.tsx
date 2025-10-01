import Link from "next/link";

export default function HomePage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
			{/* Background Elements - Adjusted for mobile */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-20 -right-20 w-40 h-40 md:-top-40 md:-right-40 md:w-80 md:h-80 bg-blue-200 rounded-full blur-3xl opacity-30 animate-float"></div>
				<div
					className="absolute -bottom-20 -left-20 w-40 h-40 md:-bottom-40 md:-left-40 md:w-80 md:h-80 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float"
					style={{ animationDelay: "2s" }}></div>
				<div
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-96 md:h-96 bg-blue-100 rounded-full blur-3xl opacity-20 animate-float"
					style={{ animationDelay: "4s" }}></div>
			</div>

			{/* Main Content */}
			<main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
				{/* Hero Section */}
				<div className="text-center max-w-2xl mx-auto w-full animate-scale-in">
					{/* Logo/Brand */}
					<div className="mb-6 sm:mb-8">
						<div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
							<svg
								className="w-8 h-8 sm:w-10 sm:h-10 text-white"
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
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
							Fresh<span className="text-gradient">Fold</span>
						</h1>
						<p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed px-4 sm:px-0">
							Experience laundry care reimagined with our premium, eco-friendly
							service
						</p>
					</div>

					{/* Feature Highlights - Stack on mobile */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
						{[
							{ icon: "⚡", title: "Fast Delivery", desc: "Within 24 hours" },
							{
								icon: "🌱",
								title: "Eco Friendly",
								desc: "Sustainable methods",
							},
							{ icon: "⭐", title: "Premium Care", desc: "Expert handling" },
						].map((feature, index) => (
							<div
								key={index}
								className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-700/50 rounded-xl p-3 sm:p-4 text-center shadow-sm animate-slide-up"
								style={{ animationDelay: `${index * 0.1}s` }}>
								<div className="text-xl sm:text-2xl mb-1 sm:mb-2">
									{feature.icon}
								</div>
								<h3 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-white mb-1">
									{feature.title}
								</h3>
								<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
									{feature.desc}
								</p>
							</div>
						))}
					</div>

					{/* Auth Buttons - Full width on mobile */}
					<div
						className="space-y-3 sm:space-y-4 w-full max-w-sm mx-auto animate-slide-up px-2 sm:px-0"
						style={{ animationDelay: "0.3s" }}>
						<Link
							href="/signin"
							className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 block text-center text-base sm:text-lg w-full">
							Get Started
						</Link>
						<Link
							href="/signin"
							className="bg-white/80 dark:bg-gray-700/50 text-gray-700 dark:text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl border border-gray-200 dark:border-gray-600 backdrop-blur-md hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 hover:scale-105 active:scale-95 block text-center text-base sm:text-lg w-full">
							Sign In
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
