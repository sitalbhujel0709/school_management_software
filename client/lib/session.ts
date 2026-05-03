import { cookies } from "next/headers";

interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT';
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return null;
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/profile`, {
      headers: {
        cookie: cookieStore.toString()
      },
      cache: "no-store"
    }
    );
    if(!res.ok){
      return null;
    }
    const data = await res.json();
    console.log(data)
    const user: User = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role
    };
    return user;

  } catch (error) {
    return null;
  }
}