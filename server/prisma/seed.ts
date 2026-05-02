import {prisma} from "../src/config/prisma.js";

const courseSeed = [
	{
		code: "CS101",
		name: "Computer Science",
		subjects: [
			{ code: "CS101-ALG", name: "Algorithms" },
			{ code: "CS101-DS", name: "Data Structures" }
		]
	},
	{
		code: "ENG201",
		name: "English",
		subjects: [
			{ code: "ENG201-LIT", name: "Literature" },
			{ code: "ENG201-LANG", name: "Language" }
		]
	}
];

async function main() {
	const courseIdByCode = new Map<string, string>();

	for (const course of courseSeed) {
		const saved = await prisma.course.upsert({
			where: { code: course.code },
			update: { name: course.name },
			create: {
				code: course.code,
				name: course.name
			}
		});

		courseIdByCode.set(course.code, saved.id);
	}

	for (const course of courseSeed) {
		const courseId = courseIdByCode.get(course.code);
		if (!courseId) {
			throw new Error(`Missing course id for ${course.code}`);
		}

		for (const subject of course.subjects) {
			await prisma.subject.upsert({
				where: { code: subject.code },
				update: {
					name: subject.name,
					courseId
				},
				create: {
					code: subject.code,
					name: subject.name,
					courseId
				}
			});
		}
	}
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
