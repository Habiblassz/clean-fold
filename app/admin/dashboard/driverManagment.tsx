import { useAdmin } from "@/contexts/AdminContext";

export default function DriversManagement() {
	const { drivers, updateDriverStatus } = useAdmin();

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
				<h2 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
					Driver Management
				</h2>
			</div>
			<div className="p-4 sm:p-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
					{drivers.map((driver) => (
						<div
							key={driver.id}
							className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 sm:p-6">
							<div className="flex items-center space-x-3 sm:space-x-4 mb-4">
								<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
									{driver.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</div>
								<div className="flex-1 min-w-0">
									<h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base truncate">
										{driver.name}
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
										{driver.email}
									</p>
								</div>
							</div>

							<div className="space-y-2 mb-4">
								<div className="flex justify-between items-center">
									<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										Status:
									</span>
									<select
										value={driver.status}
										onChange={(e) =>
											updateDriverStatus(
												driver.id,
												e.target.value as "available" | "busy" | "offline"
											)
										}
										className={`text-xs font-medium rounded px-2 py-1 ${
											driver.status === "available"
												? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
												: driver.status === "busy"
												? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
												: "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
										}`}>
										<option value="available">Available</option>
										<option value="busy">Busy</option>
										<option value="offline">Offline</option>
									</select>
								</div>
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										Phone:
									</span>
									<span className="text-xs sm:text-sm text-gray-800 dark:text-white">
										{driver.phone}
									</span>
								</div>
								{driver.currentLocation && (
									<div className="flex justify-between">
										<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
											Location:
										</span>
										<span className="text-xs sm:text-sm text-gray-800 dark:text-white truncate ml-2">
											{driver.currentLocation}
										</span>
									</div>
								)}
								<div className="flex justify-between">
									<span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
										Assigned Orders:
									</span>
									<span className="text-xs sm:text-sm text-gray-800 dark:text-white">
										{driver.assignedOrders.length}
									</span>
								</div>
							</div>

							<button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base">
								View Schedule
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
