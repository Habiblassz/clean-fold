import { useAdmin } from "@/contexts/AdminContext";
import { getStatusColor } from "@/lib/utils";
// import { useState } from "react";

export default function OverviewManagement() {
	// const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

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
		<div className="space-y-8">
			{/* Quick Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Total Revenue
							</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								${stats.totalRevenue.toLocaleString()}
							</p>
						</div>
						<div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
							<span className="text-2xl">💰</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Active Orders
							</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								{stats.activeOrders}
							</p>
						</div>
						<div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
							<span className="text-2xl">📦</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Completed Today
							</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								{stats.completedToday}
							</p>
						</div>
						<div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
							<span className="text-2xl">✅</span>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								Satisfaction
							</p>
							<p className="text-2xl font-bold text-gray-800 dark:text-white">
								{stats.customerSatisfaction}/5
							</p>
						</div>
						<div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
							<span className="text-2xl">⭐</span>
						</div>
					</div>
				</div>
			</div>

			{/* Recent Orders */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="p-6 border-b border-gray-200 dark:border-gray-700">
					<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
						Recent Orders
					</h2>
				</div>
				<div className="p-6">
					<div className="space-y-4">
						{orders.slice(0, 5).map((order) => (
							<div
								key={order.id}
								className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
								<div className="flex-1">
									<div className="flex items-center space-x-4">
										<p className="font-semibold text-gray-800 dark:text-white">
											#{order.id}
										</p>
										<p className="text-sm text-gray-600 dark:text-gray-400">
											{order.customerName}
										</p>
										<span
											className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
												order.status
											)}`}>
											{order.status.replace("-", " ").toUpperCase()}
										</span>
									</div>
									<p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
										{order.services
											.map((s) => `${s.name} (${s.quantity})`)
											.join(", ")}
									</p>
								</div>
								<div className="text-right space-x-2">
									<p className="text-sm font-semibold text-gray-800 dark:text-white">
										${order.total}
									</p>
									<div className="flex space-x-2 mt-1">
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
											className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
											Update
										</button>
										<button
											// onClick={() => setSelectedOrder(order.id)}
											className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 transition-colors">
											Details
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
					<button className="w-full mt-4 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
						View All Orders
					</button>
				</div>
			</div>
		</div>
	);
}
