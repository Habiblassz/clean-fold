import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";

export default function ServicesManagement() {
	const { services, updateService, toggleService, addService } = useAdmin();
	const [isAdding, setIsAdding] = useState(false);
	const [newService, setNewService] = useState({
		name: "",
		description: "",
		price: 0,
		unit: "lb",
		estimatedTime: "24 hours",
	});

	const handleSave = (
		serviceId: string,
		field: string,
		value: string | number
	) => {
		updateService(serviceId, { [field]: value });
	};

	const handleAddService = () => {
		addService({ ...newService, active: true });
		setNewService({
			name: "",
			description: "",
			price: 0,
			unit: "lb",
			estimatedTime: "24 hours",
		});
		setIsAdding(false);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
			<div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
				<h2 className="text-lg font-semibold text-gray-800 dark:text-white">
					Service Management
				</h2>
				<button
					onClick={() => setIsAdding(true)}
					className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
					Add Service
				</button>
			</div>

			<div className="p-6">
				{isAdding && (
					<div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-4">
						<h3 className="font-semibold mb-3">Add New Service</h3>
						<div className="grid grid-cols-2 gap-4 mb-3">
							<input
								type="text"
								placeholder="Service Name"
								value={newService.name}
								onChange={(e) =>
									setNewService({ ...newService, name: e.target.value })
								}
								className="px-3 py-2 border border-gray-300 rounded"
							/>
							<input
								type="number"
								placeholder="Price"
								value={newService.price}
								onChange={(e) =>
									setNewService({
										...newService,
										price: parseFloat(e.target.value),
									})
								}
								className="px-3 py-2 border border-gray-300 rounded"
							/>
							<input
								type="text"
								placeholder="Description"
								value={newService.description}
								onChange={(e) =>
									setNewService({ ...newService, description: e.target.value })
								}
								className="px-3 py-2 border border-gray-300 rounded col-span-2"
							/>
							<select
								value={newService.unit}
								onChange={(e) =>
									setNewService({ ...newService, unit: e.target.value })
								}
								className="px-3 py-2 border border-gray-300 rounded">
								<option value="lb">Per Pound</option>
								<option value="item">Per Item</option>
								<option value="load">Per Load</option>
							</select>
							<input
								type="text"
								placeholder="Estimated Time"
								value={newService.estimatedTime}
								onChange={(e) =>
									setNewService({
										...newService,
										estimatedTime: e.target.value,
									})
								}
								className="px-3 py-2 border border-gray-300 rounded"
							/>
						</div>
						<div className="flex space-x-2">
							<button
								onClick={handleAddService}
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
								Save
							</button>
							<button
								onClick={() => setIsAdding(false)}
								className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
								Cancel
							</button>
						</div>
					</div>
				)}

				<div className="space-y-4">
					{services.map((service) => (
						<div
							key={service.id}
							className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
							<div className="flex-1 grid grid-cols-4 gap-4">
								<input
									type="text"
									value={service.name}
									onChange={(e) =>
										handleSave(service.id, "name", e.target.value)
									}
									className="bg-transparent border-none font-semibold"
								/>
								<input
									type="text"
									value={service.description}
									onChange={(e) =>
										handleSave(service.id, "description", e.target.value)
									}
									className="bg-transparent border-none col-span-2"
								/>
								<div className="flex items-center space-x-2">
									<span>$</span>
									<input
										type="number"
										value={service.price}
										onChange={(e) =>
											handleSave(
												service.id,
												"price",
												parseFloat(e.target.value)
											)
										}
										className="bg-transparent border-none w-20"
									/>
									<span>/ {service.unit}</span>
								</div>
							</div>
							<div className="flex items-center space-x-4">
								<span className="text-sm text-gray-600">
									{service.estimatedTime}
								</span>
								<button
									onClick={() => toggleService(service.id)}
									className={`px-3 py-1 rounded text-xs ${
										service.active
											? "bg-green-500 text-white hover:bg-green-600"
											: "bg-red-500 text-white hover:bg-red-600"
									}`}>
									{service.active ? "Active" : "Inactive"}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
