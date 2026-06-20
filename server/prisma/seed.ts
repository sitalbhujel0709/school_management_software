import {prisma} from "../src/config/prisma.js";
import { Role } from "../src/generated/prisma/enums.js";

interface SemesterData {
	name: string;
	startDate: Date;
	endDate: Date;
}
const semesterData: SemesterData[] = [
	{
		name: "Fall 2023",
		startDate: new Date("2023-09-01"),
		endDate: new Date("2023-12-31")
	},
	{
		name: "Spring 2024",
		startDate: new Date("2024-01-01"),
		endDate: new Date("2024-05-31")
	}
]
		

const seed = async ()=> {
	try{
		for(const semester of semesterData){
			await prisma.semester.create({
				data: semester,
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