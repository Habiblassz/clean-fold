import { useAdmin } from "@/contexts/AdminContext";
import { getStatusColor } from "@/lib/utils";

export default function OverviewManagement() {
	const { orders, getDashboardStats, updateOrderStatus } = useAdmin();
	const stats = getDashboardStats();

	const handleStatusUpdate = (
		orderId: string,
		newStatus:
			| "pending"
			| "confirmed"
			| "in-progress"
			| "ready"
			| "delivered"
			| "cancelled"
	) => {
		updateOrderStatus(orderId, newStatus);
	};

	const getNextStatus = (currentStatus: string) => {
		switch (currentStatus) {
			case "pending":
				return "confirmed";
			case "confirmed":
				return "in-progress";
			case "in-progress":
				return "ready";
			case "ready":
				return "delivered";
			default:
				return currentStatus;
		}
	};

	return (
		<div className="space-y-6 sm:space-y-8">
			{/* Quick Stats */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
								Total Revenue
							</p>
							<p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
								${stats.totalRevenue.toLocaleString()}
							</p>
						</div>
						<div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
							<span className="text-lg sm:text-2xl">💰</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
								Active Orders
							</p>
							<p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
								{stats.activeOrders}
							</p>
						</div>
						<div className="w-8 h-8 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
							<span className="text-lg sm:text-2xl">📦</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
								Completed Today
							</p>
							<p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
								{stats.completedToday}
							</p>
						</div>
						<div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
							<span className="text-lg sm:text-2xl">✅</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
								Satisfaction
							</p>
							<p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-white">
								{stats.customerSatisfaction}/5
							</p>
						</div>
						<div className="w-8 h-8 sm:w-12 sm:h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
							<span className="text-lg sm:text-2xl">⭐</span>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Orders */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
						Recent Orders
					</h2>
				</div>
				<div className="p-4 sm:p-6">
					<div className="space-y-3 sm:space-y-4">
						{orders.slice(0, 5).map((order) => (
							<div
								key={order.id}
								className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-2 sm:space-y-0">
								<div className="flex-1">
									<div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
										<p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
											#{order.id}
										</p>
										<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
											{order.customerName}
										</p>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
												order.status
											)} w-fit`}>
											{order.status.replace("-", " ").toUpperCase()}
										</span>
									</div>
									<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
										{order.services
											.map((s) => `${s.name} (${s.quantity})`)
											.join(", ")}
									</p>
								</div>
								<div className="text-left sm:text-right space-y-2 sm:space-y-1">
									<p className="text-sm font-semibold text-gray-800 dark:text-white">
										${order.total}
									</p>
									<div className="flex space-x-2">
										<button
											onClick={() =>
												handleStatusUpdate(
													order.id,
													getNextStatus(order.status as string) as
														| "pending"
														| "confirmed"
														| "in-progress"
														| "ready"
														| "delivered"
														| "cancelled"
												)
											}
											className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
											Update
										</button>
										<button className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 transition-colors">
											Details
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<button className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 sm:py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base">
						View All Orders
					</button>
				</div>
			</div>
		</div>
	);
}
