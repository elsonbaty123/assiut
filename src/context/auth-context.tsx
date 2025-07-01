
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  fullName: string;
  email: string;
  role: "client" | "broker" | "owner" | "admin";
  password?: string;
}

interface Credentials {
    email: string;
    password?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: Credentials) => Promise<boolean>;
  logout: () => void;
  signup: (userData: User) => Promise<void>;
  updateUser: (userData: Partial<Pick<User, 'fullName'>>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUsers: User[] = [
    { fullName: "Broker User", email: "broker@example.com", password: "password123", role: "broker" },
    { fullName: "Owner User", email: "owner@example.com", password: "password123", role: "owner" },
    { fullName: "Client User", email: "client@example.com", password: "password123", role: "client" },
    { fullName: "Admin User", email: "admin@example.com", password: "password123", role: "admin" },
];


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mockUsers, setMockUsers] = useState<User[]>(initialUsers)
  const router = useRouter();

  const login = async (credentials: Credentials): Promise<boolean> => {
    const foundUser = mockUsers.find(
        (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
        const { password, ...userToSet } = foundUser;
        setUser(userToSet);
        if (userToSet.role === 'admin') {
            router.push("/admin/dashboard");
        } else {
            router.push("/");
        }
        return true;
    }
    return false;
  };

  const signup = async (userData: User) => {
    const userExists = mockUsers.some(u => u.email === userData.email);
    if(userExists) {
        // In a real app, you'd return an error.
        // For this mock, we'll just log and overwrite.
        console.warn("User with this email already exists in mock DB.");
        const otherUsers = mockUsers.filter(u => u.email !== userData.email);
        setMockUsers([...otherUsers, userData]);
    } else {
        setMockUsers(prev => [...prev, userData]);
    }
    
    const { password, ...userToSet } = userData;
    setUser(userToSet);
    router.push("/");
  };

  const updateUser = async (userData: Partial<Pick<User, 'fullName'>>): Promise<boolean> => {
    if (!user) return false;

    // Update frontend state
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);

    // Update mock database
    setMockUsers(currentUsers =>
      currentUsers.map(u =>
        u.email === user.email ? { ...u, ...userData } : u
      )
    );
    
    return true;
  };


  const logout = () => {
    const wasAdmin = user?.role === 'admin';
    setUser(null);
    if (wasAdmin) {
        router.push("/admin/login");
    } else {
        router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, updateUser }}>
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
