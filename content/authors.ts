export type AuthorKey = 'niraj' | 'shunya-team'

export type Author = {
	key: AuthorKey
	name: string
	role: string
	email: string
	bio: string
	image: string
	sameAs: readonly string[]
	// E-E-A-T: topics this author has demonstrable expertise in (feeds Person JSON-LD).
	knowsAbout: readonly string[]
}

export const AUTHORS: Record<AuthorKey, Author> = {
	niraj: {
		key: 'niraj',
		name: 'Niraj Jha',
		role: 'Co-Founder & CTO',
		email: 'contact@shunyatech.com',
		image: '/teams/kartiksingh.png',
		bio: 'Co-Founder & CTO of Shunya Tech. Full-stack architect who sets the engineering culture and technical standards behind every product we ship - from database design to production delivery on Next.js, tRPC, and Prisma.',
		sameAs: [
			'https://linkedin.com/in/nirajjha',
			'https://github.com/jha-niraj',
		],
		knowsAbout: [
			'Full-Stack Engineering',
			'Next.js',
			'tRPC',
			'Prisma',
			'Cloud Architecture',
			'AI Integration',
			'Retrieval-Augmented Generation',
			'Product Engineering',
		],
	},
	'shunya-team': {
		key: 'shunya-team',
		name: 'Shunya Team',
		role: 'Engineering & Product, Shunya Tech',
		email: 'contact@shunyatech.com',
		image: '',
		bio: 'The Shunya Tech engineering and product team. We architect, build, and scale production-grade digital products - web, mobile, AI, and cloud - and write about how we actually ship them.',
		sameAs: [
			'https://www.linkedin.com/company/shunya-tech',
			'https://github.com/Shunya-Tech-Agency',
		],
		knowsAbout: [
			'Software Engineering',
			'Product Development',
			'MVP Development',
			'Cloud Infrastructure',
			'AI Integration',
			'Web Engineering',
		],
	},
}
