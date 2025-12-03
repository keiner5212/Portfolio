export const translations = {
	en: {
		header: {
			about: "About",
			experience: "Experience",
			projects: "Projects",
			contact: "Contact",
		},
		hero: {
			title: "Keiner José Alvarado",
			subtitle: "Full-Stack Software Developer",
			birth: "08/11/2004",
			country: "Colombia - Santa Marta",
			cta: "Get in touch",
			yo: " yo",
		},
		about: {
			title: "About Me",
			content:
				"Full-stack by trade, problem-solver by nature. I build things that work and enjoy every step of the process.\n\nFrom desktop apps to mobile experiences, from databases to web platforms. I've shipped real products that people actually use. Always learning, always building.",
		},
		experience: {
			title: "Work Experience",
			present: "Present",
			OrgaAI: {
				title: "Full Stack Developer",
				link: "https://orga-ai.com/es/",
				company: "OrgaAI",
				period: "05/2025-xxxx",
				logo: "/assets/logos/orgaai/logo.jpg",
				description: "Collaborated on the development and maintenance of Javascript services for AI-focused solutions. Optimized backend logic, integrated internal APIs, and worked within Scrum workflows to deliver stable, efficient, production-ready features.",
			},
			TheorimAI: {
				title: "Full Stack Developer - Freelance",
				link: "https://cloud.theorim.io/",
				company: "Theorim.ai",
				period: "02/2025-xxxx",
				logo: "/assets/logos/theorim/logo.png",
				description: "Worked with the team to build the core of a custom data platform from the ground up, focused on speed, security, and scalability. Designed a lightweight backend, created interactive interfaces, and led AWS deployments, turning complex data into clear, actionable visualizations.",
			},
			helloApp: {
				title: "Full Stack Developer",
				link: "https://hello.app",
				company: "hello.app",
				period: "05/2023-11/2024",
				logo: "/assets/logos/hello.app/logo.png",
				description: "Worked with a talented team to make the platform easier and more enjoyable to use. We built the mobile app with React Native, created a fast web app with Tauri, and developed backend systems for file serving and user management. I helped design a responsive website and brought IPFS integration to several projects. Together, we made sure everything ran smoothly and users had a great experience.",
			},
			notiexpress: {
				title: "Technical Consultant (Freelance)",
				link: "https://www.notiexpresscolor.com/",
				company: "Notiexpress Color",
				period: "No period",
				description:
					"Provided occasional technical support to solve general problems, including hosting issues, PHP and WordPress troubleshooting, and system optimizations. Collaborated with the team to ensure smooth operation of their digital platforms.",
			}
		},
		projects: {
			title: "Projects",
			isTeamText: "Team - Employed",
			viewGithub: "View on GitHub",
			viewWebsite: "View on Website",
			viewMore: "View more",
			viewLess: "View less",
			finalCard: {
				title: "The End... or Maybe Not",
				description: "That was the most important part, but you can also check out my GitHub, where I'm always working on interesting projects.",
				buttonText: "Visit my GitHub profile",
			},
			data: [
				{
					title: "Orga AI Sonar",
					description: "Orga AI Sonar is a platform specifically designed for voice actors, enabling them to collaborate in training Orga AI's intelligence. By recording phrases, users contribute to enhancing the AI's capabilities in voice recognition and generation across multiple languages, while ensuring it can convey real emotions. This project bridges the gap between technology and human talent, creating a more natural and expressive AI.",
					technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "AWS SES"],
					website: "https://sonar.orga-ai.com/",
					github: ["https://github.com/OrgaAI/orga-sonar"],
					images: ["/assets/orga-sonar/4.png", "/assets/orga-sonar/1.png", "/assets/orga-sonar/2.png", "/assets/orga-sonar/3.png"],
					isTeam: true
				},
				{
					title: "Theorim.ai",
					description: "Theorim is a platform for intuitively modeling custom datasets with granular user and permission control. It supports complex data structures (tables, selectors, markdown, validations), record management, and integration with tools like interactive visualizations and AI-powered content generation (reports, emails, etc.).",
					technologies: ["JavaScript", "CSS", "HTML", "Node.js", "Express", "AWS CloudFormation", "DynamoDB", "S3"],
					website: "https://cloud.theorim.io/",
					github: ["https://github.com/Theorim-ai"],
					images: ["/assets/theorim/1.png", "/assets/theorim/2.png", "/assets/theorim/3.png"],
					isTeam: true
				},
				{
					title: "Hello App",
					description: "The frontend of hello.app",
					technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "SCSS", "IPFS"],
					github: ["https://github.com/Hello-Storage/hello-front"],
					website: "https://hello.app",
					images: ["/assets/hello-front/1.png", "/assets/hello-front/2.png", "/assets/hello-front/3.png", "/assets/hello-front/4.png"],
					isTeam: true
				},
				{
					title: "Skillwork",
					description: "SkillWork is an innovative platform designed to facilitate the connection between professionals and companies, optimizing the process of publishing job offers, applying for vacancies and managing quotes. Inspired by leading platforms such as Computrabajo, SkillWork offers a comprehensive solution for job searching and recruiting talent.",
					technologies: ["React Native", "Express", "TypeScript", "Expo", "Firestore", "Firebase Storage"],
					github: ["https://github.com/keiner5212/skillwork-front", "https://github.com/keiner5212/skillwork-back"],
					images: ["/assets/skillwork/1.png", "/assets/skillwork/2.png", "/assets/skillwork/3.png", "/assets/skillwork/4.png", "/assets/skillwork/5.png"]
				},
				{
					title: "Loan App",
					description: "LoansApp is a comprehensive solution designed for companies engaged in the vehicle lending and rental sector. This robust and highly customizable platform allows you to efficiently manage all aspects related to user administration, credit applications, financial calculations, contract creation, amortization tables and system configuration.",
					technologies: ["React", "Tauri", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Vite", "Docker"],
					github: ["https://github.com/keiner5212/loans-app-back", "https://github.com/keiner5212/loans-app-front"],
					images: ["/assets/loans-app/1.png", "/assets/loans-app/2.png", "/assets/loans-app/3.png",
						"/assets/loans-app/4.png", "/assets/loans-app/5.png", "/assets/loans-app/6.png", "/assets/loans-app/7.png", "/assets/loans-app/8.png", "/assets/loans-app/9.png", "/assets/loans-app/10.png"],
					isTeam: true
				},
				{
					title: "Minecraft Launcher (By Keiner5212)",
					description: "MC-Launcher is a custom launcher for Minecraft designed to offer a safe and secure experience, avoiding the use of unsafe options such as TLauncher. With MC-Launcher, players can easily manage and run multiple versions of the game, install mods, manage profiles, and optimize performance without compromising the security of their account.",
					technologies: ["Java"],
					github: ["https://github.com/keiner5212/mc-launcher"],
					images: ["/assets/mc-launcher/1.png", "/assets/mc-launcher/2.png"]
				},
				{
					title: "Hello Node",
					description: "This frontend application interacts with an IPFS node configured with the Kubo library and a local server. It also integrates with services provided by Hello.app. The frontend allows users to manage and adjust configurations through an intuitive user interface.",
					technologies: ["React", "Tauri", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Vite", "IPFS"],
					github: ["https://github.com/Hello-Storage/hello-ipfs-user-node-front/tree/app-v0.0.1",
						"https://github.com/Hello-Storage/hello-ipfs-user-node"],
					images: ["/assets/hello-ipfs-user-node-front/1.png"]
				},
				{
					title: "Autockicker",
					description: "Autoclicker is a program that allows you to click the mouse automatically at a certain rate.",
					technologies: ["Python"],
					github: ["https://github.com/keiner5212/AutoClicker"],
					images: ["/assets/autoclicker/1.png"]
				},
				{
					title: "2D_3D_learn",
					description: "This project is a collection of interactive examples to learn about 2D and 3D graphics on the web, using different rendering technologies.",
					technologies: ["JavaScript", "WebGL", "Three.js", "Canvas API", "CSS"],
					github: ["https://github.com/keiner5212/2D_3D_learn"],
					images: ["/assets/2D_3D_learn/1.png", "/assets/2D_3D_learn/2.png", "/assets/2D_3D_learn/3.png", "/assets/2D_3D_learn/4.png"]
				},
				{
					title: "Educative Game",
					description: "A small 2D game with its own graphics engine, made with vanilla javascript and the pixi.js library.",
					technologies: ["JavaScript", "Pixi.js"],
					github: ["https://github.com/keiner5212/educative-game"],
					website: "https://educative-game.vercel.app/",
					images: ["/assets/educative-game/1.png", "/assets/educative-game/2.png", "/assets/educative-game/3.png", "/assets/educative-game/4.png", "/assets/educative-game/5.png", "/assets/educative-game/6.png"]
				},
				{
					title: "Sorting algorithms and data structures",
					description: "Sorting-Methods is a repository that implements and compares various classical and modern sorting algorithms. Designed for educational and practical purposes, this project includes efficient implementations of methods such as Quick Sort, Merge Sort, Bubble Sort, Insertion Sort, Selection Sort, and more, along with analyses of their time and space complexity. Ideal for students, developers, and algorithm enthusiasts, Sorting-Methods provides a solid foundation for understanding and applying sorting techniques in different contexts, optimizing the performance of applications that require handling structured data. Data Structures is a repository that is a comprehensive collection of various data structures implemented in different programming languages. Whether you are a beginner looking to understand fundamental data structures or an experienced developer looking for reference implementations, this repository aims to provide a valuable resource.",
					technologies: ["JavaScript", "TypeScript", "Python", "Go", "C++", "Java"],
					github: ["https://github.com/keiner5212/sorting-methods", "https://github.com/keiner5212/data-structures"],
					images: ["/assets/sorting-methods/1.png", "/assets/data-structures/1.png"]
				},
				{
					title: "Auth Service",
					description: "Auth-Service is a robust and scalable server that provides all the functionality required for user authentication and management in modern applications. It offers user creation and management, secure login, two-factor authentication (2FA), sending emails and WhatsApp messages, JWT token generation, and security auditing. Designed to be easy to integrate through a well-documented RESTful API, Auth-Service ensures security, scalability, and customization, allowing developers to implement reliable authentication systems while focusing on the business logic of their applications.",
					technologies: ["Express", "TypeScript", "JWT", "PostgreSQL", "Redis", "Docker"],
					github: ["https://github.com/keiner5212/Auth-Service"],
					images: ["/assets/backend-rep.webp"]
				},
			]
		},
		contact: {
			title: "Get in Touch",
			name: "Name",
			email: "Your Email",
			message: "Message",
			send: "Send Message",
		}
	},
	es: {
		header: {
			about: "Sobre mí",
			experience: "Experiencia",
			projects: "Proyectos",
			contact: "Contacto",
		},
		hero: {
			title: "Keiner José Alvarado",
			subtitle: "Desarrollador de Software Full-Stack",
			birth: "08/11/2004",
			country: "Colombia - Santa Marta",
			cta: "Contáctame",
			yo: " años",
		},
		about: {
			title: "Sobre Mí",
			content:
				"Full-stack por profesión, solucionador de problemas por naturaleza. Construyo cosas que funcionan y disfruto cada paso del proceso.\n\nDesde apps de escritorio hasta experiencias móviles, desde bases de datos hasta plataformas web. He lanzado productos reales que la gente usa de verdad. Siempre aprendiendo, siempre construyendo.",
		},
		experience: {
			title: "Experiencia Laboral",
			present: "Presente",
			OrgaAI: {
				title: "Desarrollador Full Stack",
				link: "https://orga-ai.com/es/",
				company: "OrgaAI",
				period: "05/2025-xxxx",
				logo: "/assets/logos/orgaai/logo.jpg",
				description: "Colaboré en el desarrollo y mantenimiento de servicios en Javascript dentro de un entorno enfocado en soluciones de IA. Optimicé lógica backend, realicé integraciones de APIs y participé activamente en flujos Scrum, asegurando entregables estables, eficientes y listos para producción.",
			},
			TheorimAI: {
				title: "Desarrollador Full Stack - Freelance",
				link: "https://cloud.theorim.io/",
				company: "Theorim.ai",
				period: "02/2025-xxxx",
				logo: "/assets/logos/theorim/logo.png",
				description: "Junto con el equipo construí desde cero el núcleo de una plataforma de datos personalizada, rápida, segura y escalable. Diseñé backend propio, creé interfaces interactivas y lideré despliegues en AWS, transformando información compleja en visualizaciones claras y útiles.",
			},
			helloApp: {
				title: "Desarrollador Full Stack",
				link: "https://hello.app",
				company: "hello.app",
				period: "05/2023-11/2024",
				logo: "/assets/logos/hello.app/logo.png",
				description: "Junto a un gran equipo, mejoré la plataforma para que fuera más fácil y agradable de usar. Construimos la app móvil con React Native, creamos una web rápida con Tauri y desarrollamos sistemas backend para servir archivos y gestionar usuarios. Ayudé a diseñar un sitio web responsive e integramos IPFS en varios proyectos. Nos aseguramos de que todo funcionara bien y que los usuarios tuvieran una experiencia excelente.",
			},
			notiexpress: {
				title: "Consultor Técnico (Freelance)",
				company: "Notiexpress Color",
				period: "Sin período definido",
				description:
					"Brindé soporte técnico ocasional para resolver problemas generales, incluyendo problemas de hosting, troubleshooting en PHP y WordPress, y optimización de sistemas. Colaboré con el equipo para garantizar el correcto funcionamiento de sus plataformas digitales.",
				link: "https://www.notiexpresscolor.com/",
			}
		},
		projects: {
			title: "Proyectos",
			isTeamText: "Equipo - Empleado",
			viewGithub: "Ver en GitHub",
			viewWebsite: "Ver en Sitio Web",
			viewMore: "Ver más",
			viewLess: "Ver menos",
			finalCard: {
				title: "Fin... o casi",
				description: "Eso fue lo más importante, pero también puedes visitar mi GitHub, donde siempre estoy trabajando en cosas interesantes.",
				buttonText: "Visita mi perfil de GitHub",
			},
			data: [
				{
					title: "Orga AI Sonar",
					description: "Orga AI Sonar es una plataforma diseñada específicamente para actores de voz, permitiéndoles colaborar en el entrenamiento de la inteligencia artificial de Orga AI. A través de la grabación de frases, los usuarios contribuyen a mejorar las capacidades de la IA en el reconocimiento y la generación de voz en múltiples idiomas, mientras se asegura que esta pueda transmitir emociones reales. Este proyecto establece un puente entre la tecnología y el talento humano, creando una IA más natural y expresiva.",
					technologies: ["React", "TypeScript", "Tailwind CSS", "Supabase", "AWS SES"],
					website: "https://sonar.orga-ai.com/",
					github: ["https://github.com/OrgaAI/orga-sonar"],
					images: ["/assets/orga-sonar/4.png", "/assets/orga-sonar/1.png", "/assets/orga-sonar/2.png", "/assets/orga-sonar/3.png"],
					isTeam: true
				},
				{
					title: "Theorim.ai",
					description: "Theorim es una plataforma para modelar intuitivamente conjuntos de datos personalizados con control granular de usuarios y permisos. Soporta estructuras de datos complejas (tablas, selectores, markdown, validaciones), gestión de registros e integración con herramientas como visualizaciones interactivas y generación de contenido impulsada por IA (reportes, correos electrónicos, etc.).",
					technologies: ["JavaScript", "CSS", "HTML", "Node.js", "Express", "AWS CloudFormation", "DynamoDB", "S3"],
					website: "https://cloud.theorim.io/",
					github: ["https://github.com/Theorim-ai"],
					images: ["/assets/theorim/1.png", "/assets/theorim/2.png", "/assets/theorim/3.png"],
					isTeam: true
				},
				{
					title: "Hello App",
					description: "El frontend de hello.app",
					technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "SCSS", "IPFS"],
					github: ["https://github.com/Hello-Storage/hello-front"],
					website: "https://hello.app",
					images: ["/assets/hello-front/1.png", "/assets/hello-front/2.png", "/assets/hello-front/3.png", "/assets/hello-front/4.png"],
					isTeam: true
				},
				{
					title: "Skillwork",
					description: "SkillWork es una plataforma innovadora diseñada para facilitar la conexión entre profesionales y empresas, optimizando el proceso de publicación de ofertas laborales, aplicación a vacantes y gestión de cotizaciones. Inspirada en plataformas líderes como Computrabajo, SkillWork ofrece una solución integral para la búsqueda de empleo y la contratación de talento.",
					technologies: ["React Native", "Express", "TypeScript", "Expo", "Firestore", "Firebase Storage"],
					github: ["https://github.com/keiner5212/skillwork-front", "https://github.com/keiner5212/skillwork-back"],
					images: ["/assets/skillwork/1.png", "/assets/skillwork/2.png", "/assets/skillwork/3.png", "/assets/skillwork/4.png", "/assets/skillwork/5.png"]
				},
				{
					title: "Loan App",
					description: "LoansApp es una solución integral diseñada para empresas dedicadas al sector de préstamos y alquiler de vehículos. Esta plataforma robusta y altamente personalizable permite gestionar de forma eficiente todos los aspectos relacionados con la administración de usuarios, solicitudes de crédito, cálculos financieros, creación de contratos, tablas de amortización y configuración del sistema.",
					technologies: ["React", "Tauri", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Vite", "Docker"],
					github: ["https://github.com/keiner5212/loans-app-back", "https://github.com/keiner5212/loans-app-front"],
					images: ["/assets/loans-app/1.png", "/assets/loans-app/2.png", "/assets/loans-app/3.png",
						"/assets/loans-app/4.png", "/assets/loans-app/5.png", "/assets/loans-app/6.png", "/assets/loans-app/7.png", "/assets/loans-app/8.png", "/assets/loans-app/9.png", "/assets/loans-app/10.png"],
					isTeam: true
				},
				{
					title: "Minecraft Launcher (By Keiner5212)",
					description: "MC-Launcher es un lanzador personalizado para Minecraft diseñado para ofrecer una experiencia segura y confiable, evitando el uso de opciones inseguras como TLauncher. Con MC-Launcher, los jugadores pueden gestionar y ejecutar múltiples versiones del juego de manera sencilla, instalar mods, administrar perfiles y optimizar el rendimiento sin comprometer la seguridad de su cuenta.",
					technologies: ["Java"],
					github: ["https://github.com/keiner5212/mc-launcher"],
					images: ["/assets/mc-launcher/1.png", "/assets/mc-launcher/2.png"]
				},
				{
					title: "Hello Node",
					description: "Esta aplicación frontend interactúa con un nodo IPFS configurado con la biblioteca Kubo y un servidor local. También se integra con los servicios proporcionados por Hello.app. El frontend permite a los usuarios administrar y ajustar las configuraciones a través de una interfaz de usuario intuitiva.",
					technologies: ["React", "Tauri", "Node.js", "Express", "TypeScript", "Tailwind CSS", "Vite", "IPFS"],
					github: ["https://github.com/Hello-Storage/hello-ipfs-user-node-front/tree/app-v0.0.1",
						"https://github.com/Hello-Storage/hello-ipfs-user-node"],
					images: ["/assets/hello-ipfs-user-node-front/1.png"],
					isTeam: true
				},
				{
					title: "Autockicker",
					description: "Autoclicker es un programa que permite hacer clic en el ratón automático a una tasa determinada.",
					technologies: ["Python"],
					github: ["https://github.com/keiner5212/AutoClicker"],
					images: ["/assets/autoclicker/1.png"]
				},
				{
					title: "2D_3D_learn",
					description: "Este proyecto es una colección de ejemplos interactivos para aprender sobre gráficos 2D y 3D en la web, usando diferentes tecnologías de renderizado.",
					technologies: ["JavaScript", "WebGL", "Three.js", "Canvas API", "CSS"],
					github: ["https://github.com/keiner5212/2D_3D_learn"],
					images: ["/assets/2D_3D_learn/1.png", "/assets/2D_3D_learn/2.png", "/assets/2D_3D_learn/3.png", "/assets/2D_3D_learn/4.png"]
				},
				{
					title: "Educative Game",
					description: "Un pequeño juego 2D con un motor grafico propio, hecho con javascript vanilla y la libreria pixi.js.",
					technologies: ["JavaScript", "Pixi.js"],
					github: ["https://github.com/keiner5212/educative-game"],
					website: "https://educative-game.vercel.app/",
					images: ["/assets/educative-game/1.png", "/assets/educative-game/2.png", "/assets/educative-game/3.png", "/assets/educative-game/4.png", "/assets/educative-game/5.png", "/assets/educative-game/6.png"]
				},
				{
					title: "Algoritmos de ordenamiento y estructuras de datos",
					description: "Sorting-Methods es un repositorio que implementa y compara diversos algoritmos de ordenamiento clásicos y modernos. Diseñado para fines educativos y prácticos, este proyecto incluye implementaciones eficientes de métodos como Quick Sort, Merge Sort, Bubble Sort, Insertion Sort, Selection Sort y más, junto con análisis de su complejidad temporal y espacial. Ideal para estudiantes, desarrolladores y entusiastas de la algoritmia, Sorting-Methods ofrece una base sólida para entender y aplicar técnicas de ordenamiento en diferentes contextos, optimizando el rendimiento de aplicaciones que requieren manejo de datos estructurados. Data Structures es un repositorio es una colección completa de diversas estructuras de datos implementadas en diferentes lenguajes de programación. Tanto si es un principiante que busca comprender las estructuras de datos fundamentales como si es un desarrollador experimentado que busca implementaciones de referencia, este repositorio tiene como objetivo proporcionar un recurso valioso.",
					technologies: ["JavaScript", "TypeScript", "Python", "Go", "C++", "Java"],
					github: ["https://github.com/keiner5212/sorting-methods", "https://github.com/keiner5212/data-structures"],
					images: ["/assets/sorting-methods/1.png", "/assets/data-structures/1.png"]
				},
				{
					title: "Auth Service",
					description: "Auth-Service es un servidor robusto y escalable que proporciona toda la funcionalidad necesaria para la autenticación y gestión de usuarios en aplicaciones modernas. Ofrece creación y gestión de usuarios, inicio de sesión seguro, autenticación de dos factores (2FA), envío de correos electrónicos y mensajes de WhatsApp, generación de tokens JWT y auditoría de seguridad. Diseñado para ser fácil de integrar a través de una API RESTful bien documentada, Auth-Service garantiza seguridad, escalabilidad y personalización, lo que permite a los desarrolladores implementar sistemas de autenticación confiables mientras se concentran en la lógica comercial de sus aplicaciones.",
					technologies: ["Express", "TypeScript", "JWT", "PostgreSQL", "Redis", "Docker"],
					github: ["https://github.com/keiner5212/Auth-Service"],
					images: ["/assets/backend-rep.webp"]
				},
			]
		},
		contact: {
			title: "Contáctame",
			name: "Nombre",
			email: "Tu Correo electrónico",
			message: "Mensaje",
			send: "Enviar Mensaje",
		}
	},
};
