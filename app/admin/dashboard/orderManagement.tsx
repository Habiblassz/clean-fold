import { useAdmin } from "@/contexts/AdminContext";
import { getStatusColor } from "@/lib/utils";
// import { useState } from "react";

export default function OrderManagement() {
	// const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

	const { orders, drivers, updateOrderStatus, assignDriver } = useAdmin();

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

	const handleAssignDriver = (orderId: string, driverId: string) => {
		assignDriver(orderId, driverId);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
					All Orders
				</h2>
			</div>
			<div className="p-6">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-gray-200 dark:border-gray-700">
								<th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
									Order ID
								</th>
								<th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
									Customer
								</th>
								<th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
									Services
								</th>
								<th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
									Total
								</th>
								<th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
									Status
								</th>
								<th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr
									key={order.id}
									className="border-b border-gray-200 dark:border-gray-700">
									<td className="py-4 text-sm font-medium text-gray-800 dark:text-white">
										#{order.id}
									</td>
									<td className="py-4 text-sm text-gray-600 dark:text-gray-400">
										<div>
											<p>{order.customerName}</p>
											<p className="text-xs">{order.customerPhone}</p>
										</div>
									</td>
									<td className="py-4 text-sm text-gray-600 dark:text-gray-400">
										{order.services
											.map((s) => `${s.name} (${s.quantity})`)
											.join(", ")}
									</td>
									<td className="py-4 text-sm font-semibold text-gray-800 dark:text-white">
										${order.total}
									</td>
									<td className="py-4">
										<select
											value={order.status}
											onChange={(e) =>
												handleStatusUpdate(
													order.id,
													e.target.value as
														| "pending"
														| "confirmed"
														| "in-progress"
														| "ready"
														| "delivered"
														| "cancelled"
												)
											}
											className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${getStatusColor(
												order.status
											)}`}>
											<option value="pending">PENDING</option>
											<option value="confirmed">CONFIRMED</option>
											<option value="in-progress">IN PROGRESS</option>
											<option value="ready">READY</option>
											<option value="delivered">DELIVERED</option>
											<option value="cancelled">CANCELLED</option>
										</select>
									</td>
									<td className="py-4">
										<div className="flex space-x-2">
											<button
												// onClick={() => setSelectedOrder(order.id)}
												className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors">
												Details
											</button>
											{!order.assignedDriver && (
												<select
													onChange={(e) =>
														handleAssignDriver(order.id, e.target.value)
													}
													className="bg-gray-500 text-white px-3 py-1 rounded text-xs hover:bg-gray-600 transition-colors">
													<option value="">Assign Driver</option>
													{drivers
														.filter((d) => d.status === "available")
														.map((driver) => (
															<option key={driver.id} value={driver.id}>
																{driver.name}
															</option>
														))}
												</select>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
