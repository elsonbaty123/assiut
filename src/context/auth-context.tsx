"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "client" | "broker" | "owner" | "admin";
  password?: string;
  status: "active" | "banned";
}

type SignupData = Omit<User, "id" | "status">;

interface Credentials {
    email: string;
    password?: string;
}

interface AuthContextType {
  user: Omit<User, 'password'> | null;
  users: Omit<User, 'password'>[];
  login: (credentials: Credentials) => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<{ success: boolean; messageKey?: string }>;
  updateUser: (userData: Partial<Pick<User, 'fullName'>>) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  toggleUserStatus: (userId: string) => Promise<boolean>;
  changePassword: (passwords: { currentPassword: string; newPassword: string }) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUsers: User[] = [
    { id: "user-1", fullName: "Broker User", email: "broker@example.com", phoneNumber: "01012345678", password: "password123", role: "broker", status: "active" },
    { id: "user-2", fullName: "Owner User", email: "owner@example.com", phoneNumber: "01187654321", password: "password123", role: "owner", status: "active" },
    { id: "user-3", fullName: "Client User", email: "client@example.com", phoneNumber: "01255555555", password: "password123", role: "client", status: "active" },
    { id: "user-4", fullName: "Admin User", email: "admin@example.com", phoneNumber: "01500000000", password: "password123", role: "admin", status: "active" },
];


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'password'> | null>(null);
  const [mockUsers, setMockUsers] = useState<User[]>(initialUsers);
  const router = useRouter();

  const safeUsers = mockUsers.map(({ password, ...rest }) => rest);

  const login = async (credentials: Credentials): Promise<boolean> => {
    const foundUser = mockUsers.find(
        (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
        if (foundUser.status === 'banned') {
          return false;
        }
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

  const signup = async (userData: SignupData): Promise<{ success: boolean; messageKey?: string }> => {
    const emailExists = mockUsers.some(u => u.email === userData.email);
    if (emailExists) {
        return { success: false, messageKey: 'validationEmailExists' };
    }
    const phoneExists = mockUsers.some(u => u.phoneNumber === userData.phoneNumber);
    if (phoneExists) {
        return { success: false, messageKey: 'validationPhoneExists' };
    }
    
    const newUser: User = {
        ...userData,
        id: `user-${Date.now()}`,
        status: 'active'
    };
    
    setMockUsers(prev => [...prev, newUser]);
    
    const { password, ...userToSet } = newUser;
    setUser(userToSet);
    router.push("/");
    return { success: true };
  };

  const updateUser = async (userData: Partial<Pick<User, 'fullName'>>): Promise<boolean> => {
    if (!user) return false;

    // Update frontend state
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser as Omit<User, 'password'>);

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

  const deleteUser = async (userId: string): Promise<boolean> => {
    if (user?.id === userId) return false; // Admin cannot delete themselves
    setMockUsers(prev => prev.filter(u => u.id !== userId));
    return true;
  };

  const toggleUserStatus = async (userId: string): Promise<boolean> => {
    if (user?.id === userId) return false; // Admin cannot ban themselves
    setMockUsers(prev => prev.map(u => 
        u.id === userId 
        ? { ...u, status: u.status === 'active' ? 'banned' : 'active' }
        : u
    ));
    return true;
  };

  const changePassword = async (passwords: { currentPassword: string; newPassword: string }): Promise<{ success: boolean; message: string }> => {
    if (!user) return { success: false, message: 'pleaseLogin' };

    const userInDb = mockUsers.find(u => u.id === user.id);

    if (!userInDb || userInDb.password !== passwords.currentPassword) {
        return { success: false, message: 'incorrectCurrentPassword' };
    }

    setMockUsers(currentUsers =>
        currentUsers.map(u =>
            u.id === user.id ? { ...u, password: passwords.newPassword } : u
        )
    );

    return { success: true, message: 'passwordUpdateSuccess' };
  };

  return (
    <AuthContext.Provider value={{ user, users: safeUsers, login, logout, signup, updateUser, deleteUser, toggleUserStatus, changePassword }}>
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
