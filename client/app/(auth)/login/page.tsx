"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { LoginCard } from "@/components/web/login-card"
import axiosInstance from "@/lib/axios"

type LoginValues = {
  email: string
  password: string
}


const Page = () => {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>()

  const handleSubmit = async (values: LoginValues) => {
    setError(undefined)
    try {
      const response = await axiosInstance.post("/auth/login",values);
      if(response.data.success){
        router.replace("/")
      }

    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <LoginCard onSubmit={handleSubmit} error={error} />
    </div>
  )
}

export default Page