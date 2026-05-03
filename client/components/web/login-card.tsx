"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.regex(/[A-Z]/, "Password must contain at least one uppercase letter")
		.regex(/[a-z]/, "Password must contain at least one lowercase letter")
		.regex(/[0-9]/, "Password must contain at least one number")
		.regex(/[@$!%*?&]/, "Password must contain at least one special character"),
})

type LoginFormValues = z.infer<typeof loginSchema>

type LoginCardProps = {
	onSubmit: (values: LoginFormValues) => Promise<void> | void
	error?: string
}

export function LoginCard({
	onSubmit,
	error,
}: LoginCardProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema as any),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	return (
		<Card className="w-full max-w-md">
			<CardHeader>
				<CardTitle>Welcome back</CardTitle>
				<CardDescription>
					Sign in to your account
				</CardDescription>
			</CardHeader>

			<CardContent>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="space-y-4"
				>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>

						<Input
							id="email"
							type="email"
							placeholder="teacher@school.edu"
							{...register("email")}
						/>

						{errors.email && (
							<p className="text-sm text-destructive">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>

						<Input
							id="password"
							type="password"
							placeholder="Enter password"
							{...register("password")}
						/>

						{errors.password && (
							<p className="text-sm text-destructive">
								{errors.password.message}
							</p>
						)}
					</div>

					{error && (
						<p className="text-sm text-destructive">
							{error}
						</p>
					)}

					<Button
						type="submit"
						className="w-full"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</CardContent>

			<CardFooter className="text-xs text-muted-foreground">
				Don't have an account? Contact your administrator.
			</CardFooter>
		</Card>
	)
}
