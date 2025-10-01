import { useAdmin } from "@/contexts/AdminContext";

export default function CustomersManagement() {
	const { customers } = useAdmin();

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
					Customer Management
				</h2>
			</div>
			<div className="p-3 sm:p-6">
				<div className="overflow-x-auto">
					<table className="w-full min-w-[800px]">
						<thead>
							<tr className="border-b border-gray-200 dark:border-gray-700">
								<th className="text-left py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
									Customer
								</th>
								<th className="text-left py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
									Contact
								</th>
								<th className="text-left py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
									Total Orders
								</th>
								<th className="text-left py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
									Total Spent
								</th>
								<th className="text-left py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
									Join Date
								</th>
								<th className="text-left py-3 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">
									Last Order
								</th>
							</tr>
						</thead>
						<tbody>
							{customers.map((customer) => (
								<tr
									key={customer.id}
									className="border-b border-gray-200 dark:border-gray-700">
									<td className="py-3 sm:py-4">
										<div>
											<p className="font-medium text-gray-800 dark:text-white text-xs sm:text-sm">
												{customer.name}
											</p>
											<p className="text-xs text-gray-600 dark:text-gray-400">
												{customer.email}
											</p>
										</div>
									</td>
									<td className="py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										{customer.phone}
									</td>
									<td className="py-3 sm:py-4 text-xs sm:text-sm text-gray-800 dark:text-white">
										{customer.totalOrders}
									</td>
									<td className="py-3 sm:py-4 text-xs sm:text-sm font-semibold text-gray-800 dark:text-white">
										${customer.totalSpent}
									</td>
									<td className="py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										{new Date(customer.joinDate).toLocaleDateString()}
									</td>
									<td className="py-3 sm:py-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										{customer.lastOrder
											? new Date(customer.lastOrder).toLocaleDateString()
											: "Never"}
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
