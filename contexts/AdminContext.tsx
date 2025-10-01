"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AdminOrder {
	id: string;
	customerName: string;
	customerEmail: string;
	customerPhone: string;
	services: Array<{
		name: string;
		quantity: number;
		price: number;
	}>;
	total: number;
	status:
		| "pending"
		| "confirmed"
		| "in-progress"
		| "ready"
		| "delivered"
		| "cancelled";
	pickupDate: string;
	pickupTime: string;
	deliveryDate: string;
	deliveryTime: string;
	address: string;
	specialInstructions?: string;
	createdAt: string;
	assignedDriver?: string;
}

interface Service {
	id: string;
	name: string;
	description: string;
	price: number;
	unit: string;
	active: boolean;
	estimatedTime: string;
}

interface Driver {
	id: string;
	name: string;
	email: string;
	phone: string;
	status: "available" | "busy" | "offline";
	currentLocation?: string;
	assignedOrders: string[];
}

interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	totalOrders: number;
	totalSpent: number;
	joinDate: string;
	lastOrder?: string;
}

interface AdminContextType {
	// Data
	orders: AdminOrder[];
	services: Service[];
	drivers: Driver[];
	customers: Customer[];

	// Order Management
	updateOrderStatus: (orderId: string, status: AdminOrder["status"]) => void;
	assignDriver: (orderId: string, driverId: string) => void;
	cancelOrder: (orderId: string) => void;
	addOrderNote: (orderId: string, note: string) => void;

	// Service Management
	updateService: (serviceId: string, updates: Partial<Service>) => void;
	toggleService: (serviceId: string) => void;
	addService: (service: Omit<Service, "id">) => void;

	// Driver Management
	updateDriverStatus: (driverId: string, status: Driver["status"]) => void;

	// Analytics
	getDashboardStats: () => {
		totalRevenue: number;
		activeOrders: number;
		completedToday: number;
		pendingPickups: number;
		customerSatisfaction: number;
	};

	// Loading states
	isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Mock initial data
const initialOrders: AdminOrder[] = [
	{
		id: "1001",
		customerName: "John Doe",
		customerEmail: "john@example.com",
		customerPhone: "+1 (555) 123-4567",
		services: [
			{ name: "Wash & Fold", quantity: 5, price: 1.5 },
			{ name: "Ironing", quantity: 3, price: 3.0 },
		],
		total: 16.5,
		status: "in-progress",
		pickupDate: "2024-07-15",
		pickupTime: "10:00 AM",
		deliveryDate: "2024-07-16",
		deliveryTime: "04:00 PM",
		address: "123 Main St, Apt 4B, New York, NY",
		specialInstructions: "Please use eco-friendly detergent",
		createdAt: "2024-07-14T10:30:00Z",
		assignedDriver: "driver1",
	},
	{
		id: "1002",
		customerName: "Sarah Smith",
		customerEmail: "sarah@example.com",
		customerPhone: "+1 (555) 987-6543",
		services: [{ name: "Dry Cleaning", quantity: 2, price: 7.0 }],
		total: 14.0,
		status: "ready",
		pickupDate: "2024-07-15",
		pickupTime: "02:00 PM",
		deliveryDate: "2024-07-16",
		deliveryTime: "06:00 PM",
		address: "456 Oak Ave, Brooklyn, NY",
		createdAt: "2024-07-14T14:20:00Z",
		assignedDriver: "driver2",
	},
	{
		id: "1003",
		customerName: "Mike Johnson",
		customerEmail: "mike@example.com",
		customerPhone: "+1 (555) 555-0123",
		services: [{ name: "Wash & Fold", quantity: 8, price: 1.5 }],
		total: 12.0,
		status: "pending",
		pickupDate: "2024-07-16",
		pickupTime: "09:00 AM",
		deliveryDate: "2024-07-17",
		deliveryTime: "03:00 PM",
		address: "789 Pine St, Queens, NY",
		createdAt: "2024-07-15T08:15:00Z",
	},
	{
		id: "1004",
		customerName: "Emily Brown",
		customerEmail: "emily@example.com",
		customerPhone: "+1 (555) 234-5678",
		services: [
			{ name: "Wash & Fold", quantity: 12, price: 1.5 },
			{ name: "Ironing", quantity: 5, price: 3.0 },
		],
		total: 33.0,
		status: "delivered",
		pickupDate: "2024-07-14",
		pickupTime: "11:00 AM",
		deliveryDate: "2024-07-15",
		deliveryTime: "05:00 PM",
		address: "321 Elm St, Manhattan, NY",
		createdAt: "2024-07-13T16:45:00Z",
		assignedDriver: "driver1",
	},
];

const initialServices: Service[] = [
	{
		id: "1",
		name: "Wash & Fold",
		description: "Professional washing and neat folding",
		price: 1.5,
		unit: "lb",
		active: true,
		estimatedTime: "24 hours",
	},
	{
		id: "2",
		name: "Dry Cleaning",
		description: "Expert care for delicate garments",
		price: 7.0,
		unit: "item",
		active: true,
		estimatedTime: "48 hours",
	},
	{
		id: "3",
		name: "Ironing",
		description: "Crisp, professional finishing",
		price: 3.0,
		unit: "item",
		active: true,
		estimatedTime: "24 hours",
	},
];

const initialDrivers: Driver[] = [
	{
		id: "driver1",
		name: "Robert Wilson",
		email: "robert@freshfold.com",
		phone: "+1 (555) 111-2233",
		status: "busy",
		currentLocation: "Upper East Side",
		assignedOrders: ["1001", "1004"],
	},
	{
		id: "driver2",
		name: "Maria Garcia",
		email: "maria@freshfold.com",
		phone: "+1 (555) 444-5566",
		status: "available",
		currentLocation: "Downtown",
		assignedOrders: ["1002"],
	},
	{
		id: "driver3",
		name: "James Chen",
		email: "james@freshfold.com",
		phone: "+1 (555) 777-8899",
		status: "offline",
		assignedOrders: [],
	},
];

const initialCustomers: Customer[] = [
	{
		id: "cust1",
		name: "John Doe",
		email: "john@example.com",
		phone: "+1 (555) 123-4567",
		totalOrders: 8,
		totalSpent: 245.5,
		joinDate: "2024-01-15",
		lastOrder: "2024-07-14",
	},
	{
		id: "cust2",
		name: "Sarah Smith",
		email: "sarah@example.com",
		phone: "+1 (555) 987-6543",
		totalOrders: 12,
		totalSpent: 420.0,
		joinDate: "2023-11-20",
		lastOrder: "2024-07-14",
	},
	{
		id: "cust3",
		name: "Mike Johnson",
		email: "mike@example.com",
		phone: "+1 (555) 555-0123",
		totalOrders: 3,
		totalSpent: 65.0,
		joinDate: "2024-05-10",
		lastOrder: "2024-07-15",
	},
];

export function AdminProvider({ children }: { children: ReactNode }) {
	const [orders, setOrders] = useState<AdminOrder[]>(initialOrders);
	const [services, setServices] = useState<Service[]>(initialServices);
	const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
	const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
	const [isLoading, setIsLoading] = useState(false);

	// Order Management Functions
	const updateOrderStatus = (orderId: string, status: AdminOrder["status"]) => {
		setOrders((prev) =>
			prev.map((order) => (order.id === orderId ? { ...order, status } : order))
		);
	};

	const assignDriver = (orderId: string, driverId: string) => {
		setOrders((prev) =>
			prev.map((order) =>
				order.id === orderId ? { ...order, assignedDriver: driverId } : order
			)
		);

		setDrivers((prev) =>
			prev.map((driver) =>
				driver.id === driverId
					? { ...driver, assignedOrders: [...driver.assignedOrders, orderId] }
					: driver
			)
		);
	};

	const cancelOrder = (orderId: string) => {
		setOrders((prev) =>
			prev.map((order) =>
				order.id === orderId ? { ...order, status: "cancelled" } : order
			)
		);
	};

	const addOrderNote = (orderId: string, note: string) => {
		// In a real app, this would add to a notes array
		console.log(`Note added to order ${orderId}: ${note}`);
	};

	// Service Management Functions
	const updateService = (serviceId: string, updates: Partial<Service>) => {
		setServices((prev) =>
			prev.map((service) =>
				service.id === serviceId ? { ...service, ...updates } : service
			)
		);
	};

	const toggleService = (serviceId: string) => {
		setServices((prev) =>
			prev.map((service) =>
				service.id === serviceId
					? { ...service, active: !service.active }
					: service
			)
		);
	};

	const addService = (service: Omit<Service, "id">) => {
		const newService: Service = {
			...service,
			id: `service-${Date.now()}`,
		};
		setServices((prev) => [...prev, newService]);
	};

	// Driver Management Functions
	const updateDriverStatus = (driverId: string, status: Driver["status"]) => {
		setDrivers((prev) =>
			prev.map((driver) =>
				driver.id === driverId ? { ...driver, status } : driver
			)
		);
	};

	// Analytics Functions
	const getDashboardStats = () => {
		const totalRevenue = orders
			.filter((order) => order.status === "delivered")
			.reduce((sum, order) => sum + order.total, 0);

		const activeOrders = orders.filter((order) =>
			["pending", "confirmed", "in-progress", "ready"].includes(order.status)
		).length;

		const today = new Date().toISOString().split("T")[0];
		const completedToday = orders.filter(
			(order) => order.status === "delivered" && order.deliveryDate === today
		).length;

		const pendingPickups = orders.filter(
			(order) => order.status === "pending" || order.status === "confirmed"
		).length;

		// Mock customer satisfaction (would come from reviews in real app)
		const customerSatisfaction = 4.8;

		return {
			totalRevenue,
			activeOrders,
			completedToday,
			pendingPickups,
			customerSatisfaction,
		};
	};

	return (
		<AdminContext.Provider
			value={{
				orders,
				services,
				drivers,
				customers,
				updateOrderStatus,
				assignDriver,
				cancelOrder,
				addOrderNote,
				updateService,
				toggleService,
				addService,
				updateDriverStatus,
				getDashboardStats,
				isLoading,
			}}>
			{children}
		</AdminContext.Provider>
	);
}

export function useAdmin() {
	const context = useContext(AdminContext);
	if (context === undefined) {
		throw new Error("useAdmin must be used within an AdminProvider");
	}
	return context;
}
