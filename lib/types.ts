export interface Service {
	id: string;
	name: string;
	description: string;
	price: number;
	unit: string;
	icon: string;
	quantity: number;
}

export interface OrderItem {
	serviceId: string;
	quantity: number;
	price: number;
}

export interface Schedule {
	pickup: {
		date: Date;
		time: string;
	};
	delivery: {
		date: Date;
		time: string;
	};
}

export interface Order {
	id: string;
	items: OrderItem[];
	total: number;
	status: "pending" | "confirmed" | "in-progress" | "completed" | "delivered";
	schedule: Schedule;
	createdAt: Date;
}

export type NavItem = {
	name: string;
	href: string;
	icon: string;
	active: boolean;
};

export interface ServiceItem {
	id: string;
	name: string;
	type: string;
	price: number;
}

export interface PaymentMethod {
	id: string;
	name: string;
	type: "card" | "digital";
	lastFour?: string;
}

export interface Rating {
	stars: number;
	percentage: number;
}

export interface User {
	id: string;
	email: string;
	name: string;
	role: "customer" | "admin";
	password: string;
	phone?: string;
	avatar?: string;
}

export interface AuthContextType {
	user: User | null;
	login: (email: string, password: string) => Promise<boolean>;
	logout: () => void;
	isLoading: boolean;
}

export interface CalendarProps {
	selectedDate: Date | null;
	onDateSelect: (date: Date) => void;
	minDate?: Date;
}
