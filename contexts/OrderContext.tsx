"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Service {
	id: string;
	name: string;
	description: string;
	price: number;
	unit: string;
	icon: string;
	features: string[];
	quantity: number;
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
	services: Service[];
	schedule: Schedule | null;
	ecoFriendly: boolean;
	promoCode?: string;
	discount: number;
}

export interface OrderContextType {
	order: Order;
	updateServices: (services: Service[]) => void;
	updateSchedule: (schedule: Schedule) => void;
	updateEcoFriendly: (ecoFriendly: boolean) => void;
	updatePromoCode: (promoCode: string) => void;
	clearOrder: () => void;
}

const defaultOrder: Order = {
	services: [],
	schedule: null,
	ecoFriendly: false,
	discount: 0,
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
	const [order, setOrder] = useState<Order>(defaultOrder);

	const updateServices = (services: Service[]) => {
		setOrder((prev) => ({ ...prev, services }));
	};

	const updateSchedule = (schedule: Schedule) => {
		setOrder((prev) => ({ ...prev, schedule }));
	};

	const updateEcoFriendly = (ecoFriendly: boolean) => {
		setOrder((prev) => ({ ...prev, ecoFriendly }));
	};

	const updatePromoCode = (promoCode: string) => {
		// Simple discount logic - in real app, this would call an API
		const discount = promoCode === "FRESH10" ? 10 : 0;
		setOrder((prev) => ({ ...prev, promoCode, discount }));
	};

	const clearOrder = () => {
		setOrder(defaultOrder);
	};

	return (
		<OrderContext.Provider
			value={{
				order,
				updateServices,
				updateSchedule,
				updateEcoFriendly,
				updatePromoCode,
				clearOrder,
			}}>
			{children}
		</OrderContext.Provider>
	);
}

export function useOrder() {
	const context = useContext(OrderContext);
	if (context === undefined) {
		throw new Error("useOrder must be used within an OrderProvider");
	}
	return context;
}
