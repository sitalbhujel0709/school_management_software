import {prisma} from "../src/config/prisma.js";
import { Role } from "../src/generated/prisma/enums.js";

interface UserData {
	email: string;
	password: string;
	name: string;
	role: Role;
	isVerified: boolean;
}
const userData: UserData[] = [
	{
		email: "sital@example.com",
		password: "password123",
		name:"sital bhujel",
		role: "ADMIN",
		isVerified: true,
	},
	{
		email: "ning@example.com",
		password: "password123",
		name:"ningwa iwahang",
		role: "STUDENT",
		isVerified: true,
	},
	{
		email: "teacher@example.com",
		password: "password123",
		name:"teacher name",
		role: "TEACHER",
		isVerified: true,
	},
	{
		email: "johndoe@example.com",
		password: "password123",
		name:"john doe",
		role: "STUDENT",
		isVerified: true,
	},
	{
		email: "janesmith@example.com",
		password: "password123",
		name:"jane smith",
		role: "TEACHER",
		isVerified: true,
	}
]

const seed = async ()=> {
	try{
		for(const user of userData){
			await prisma.user.create({
				data: user,
			})
		}
	} catch(error){
		console.error("Error seeding data:", error);
	}
}

seed().then(()=>{
	console.log("Data seeded successfully");
}).catch((error)=>{
	console.error("Error seeding data:", error);
});