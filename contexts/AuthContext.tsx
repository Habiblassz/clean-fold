"use client";

import { AuthContextType, User } from "@/lib/types";
import { createContext, useContext, useState, ReactNode } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
export const mockUsers: User[] = [
	{
		id: "1",
		email: "customer@freshfold.com",
		name: "John Customer",
		role: "customer",
		phone: "+1 (444) 123-4567",
		password: "password",
	},
	{
		id: "2",
		email: "admin@freshfold.com",
		name: "Freshfold Business",
		role: "admin",
		phone: "+1 (333) 987-6543",
		password: "password",
	},
	{
		id: "99999999999",
		email: "lassz@admin.role",
		name: "Lassz Admin",
		role: "admin",
		phone: "+1 (222) 000-1234",
		password: "passkey",
	},
];

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const login = async (email: string, password: string): Promise<boolean> => {
		setIsLoading(true);

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// Mock authentication - in real app, this would call your backend
		const foundUser = mockUsers.find((u) => u.email === email);

		if (foundUser && password === foundUser.password) {
			// Simple mock password
			setUser(foundUser);
			setIsLoading(false);
			return true;
		}

		setIsLoading(false);
		return false;
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
