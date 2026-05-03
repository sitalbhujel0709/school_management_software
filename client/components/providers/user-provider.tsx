"use client";

import axiosInstance from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}

const userContext = createContext<{user: UserContextType | null;loading:boolean} | null>(null);

export const UserProvider = ({children}:{children:React.ReactNode})=>{
  const [user,setUser] = useState<UserContextType | null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    const fetchUser = async ()=>{
    try {
      const response = await axiosInstance.get("/users/profile");
      console.log("User profile response:", response.data);
      if(response.data){
        const userData = response.data.user;
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatarUrl: userData.avatarUrl || null,
        })

      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }
  fetchUser();
},[])

  return (
    <userContext.Provider value={{user,loading}}>
      {children}
    </userContext.Provider>
  )
}

export const useUser = ()=>{
  const context = useContext(userContext);
  if(!context){
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}