import { title } from "node:process";

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
			subtitle: "Software Developer",
			cta: "Get in touch",
		},
		about: {
			title: "About Me",
			content:
				"Dynamic Systems Engineer adept in crafting innovative desktop and Android applications, orchestrating seamless database solutions, and sculpting engaging web experiences. I thrive on technological challenges, fueled by a relentless pursuit of knowledge and a knack for problem-solving. My forte lies not only in my technical prowess but also in my agility to adapt to ever-evolving landscapes.",
		},
		experience: {
			title: "Work Experience",
			TheorimAI: {
				title: "Full Stack Developer",
				link: "https://cloud.theorim.io/",
				company: "Theorim.ai",
				period: "January 2025 - Present",
				description:
					"Designed and implemented core features for a custom data modeling platform, using AWS technologies and pure JavaScript to ensure performance, security, and scalability:\n" +
					"- AWS Infrastructure: Built complex deployments with services like ALB, S3, CloudFront, DynamoDB, Lambda, and CloudWatch.\n" +
					"- Backend with Express: Responsible for business logic, authentication, permissions management, and dynamic data processing.\n" +
					"- Frontend with Vanilla JavaScript: Created fully interactive interfaces without frameworks, using modular architecture and robust design patterns.\n" +
					"- Deployment and upgrade system: Implemented secure update flows using AWS UpdateStack for dev, QA, and production environments.\n" +
					"- Data modeling and visualization: Developed modules for building complex datasets and generating interactive reports and dashboards.\n" +
					"Worked closely with cross-functional teams to deliver scalable and maintainable solutions across the entire stack.",
			},
			helloApp: {
				title: "Full Stack Developer",
				link: "https://hello.app",
				company: "hello.app",
				period: "May 2023 - November 2024 (1 year, 6 months)",
				description:
					"Enhanced the usability and functionality of the company's platform by working on multiple projects:\n" +
					"- Mobile App: Developed using React Native, focusing on delivering a seamless cross-platform user experience.\n" +
					"- Web App: Built with Tauri, ensuring high performance and a modern user interface.\n" +
					"- Backend Systems: Worked on two distinct backend systems:\n" +
					"  - Gin: Designed to serve files efficiently.\n" +
					"  - Express: Managed user authentication, statistics, and specific services.\n" +
					"- Website: Developed using React, ensuring a responsive and interactive user experience.\n" +
					"Integrated IPFS (InterPlanetary File System) across multiple projects to enable decentralized file storage and sharing.\n" +
					"Collaborated closely with cross-functional teams to implement scalable and efficient technological solutions, improving user experience.",
			},
			notiexpress: {
				title: "Technical Consultant (Freelance)",
				link: "https://www.notiexpresscolor.com/",
				company: "Notiexpress Color",
				period: "No period",
				description:
					"Provided occasional technical support to solve general problems, including hosting issues, PHP and WordPress troubleshooting, and system optimizations. Collaborated with the team to ensure smooth operation of their digital platforms.",
			},
			freelance: {
				title: "Web Developer (Freelance)",
				link: undefined,
				company: "Perímetro Urbano",
				period: "January 2020 - Present",
				description:
					"Worked on various web development projects as a freelancer, delivering custom solutions to clients.",
			},
		},
		projects: {
			title: "Projects",
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
					title: "Theorim.ai",
					description: "Theorim is a platform for intuitively modeling custom datasets with granular user and permission control. It supports complex data structures (tables, selectors, markdown, validations), record management, and integration with tools like interactive visualizations and AI-powered content generation (reports, emails, etc.).",
					technologies: ["JavaScript", "CSS", "HTML", "Node.js", "Express", "AWS CloudFormation", "DynamoDB", "S3"],
					website: "https://cloud.theorim.io/",
					github: ["https://github.com/Theorim-ai"],
					images: ["/assets/theorim/1.png", "/assets/theorim/2.png", "/assets/theorim/3.png"]
				},
				{
					title: "Hello App",
					description: "The frontend of hello.app",
					technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "SCSS", "IPFS"],
					github: ["https://github.com/Hello-Storage/hello-front"],
					website: "https://hello.app",
					images: ["/assets/hello-front/1.png", "/assets/hello-front/2.png", "/assets/hello-front/3.png", "/assets/hello-front/4.png"]
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
						"/assets/loans-app/4.png", "/assets/loans-app/5.png", "/assets/loans-app/6.png", "/assets/loans-app/7.png", "/assets/loans-app/8.png", "/assets/loans-app/9.png", "/assets/loans-app/10.png"]
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
					title: "Hello Back",
					description: "The backend of hello.app",
					technologies: ["Go", "Node.js", "PostgreSQL", "Redis", "S3", "IPFS", "Docker"],
					github: ["priv"],
					website: "https://api-staging.joinhello.app/api/",
					images: ["/assets/backend-rep.webp"]
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
			email: "Email",
			message: "Message",
			send: "Send Message",
		},
		footer: {
			rights:
				"Rights reserved. Developed with original code. Free icons from third parties..",
		},
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
			subtitle: "Desarrollador de Software",
			cta: "Contáctame",
		},
		about: {
			title: "Sobre Mí",
			content:
				"Ingeniero de Sistemas dinámico especializado en la creación de aplicaciones innovadoras de escritorio y Android, orquestando soluciones de bases de datos sin problemas y esculpiendo experiencias web atractivas. Prospero en desafíos tecnológicos, impulsado por una búsqueda incesante de conocimiento y una habilidad para resolver problemas. Mi fortaleza radica no solo en mi destreza técnica, sino también en mi agilidad para adaptarme a paisajes en constante evolución.",
		},
		experience: {
			title: "Experiencia Laboral",
			TheorimAI: {
				title: "Desarrollador Full Stack",
				link: "https://cloud.theorim.io/",
				company: "Theorim.ai",
				period: "Enero 2025 - Present",
				description:
					"Desarrollé e integré funcionalidades clave para una plataforma de modelado de datos personalizados, trabajando con tecnologías de AWS y JavaScript puro para garantizar rendimiento, seguridad y escalabilidad:\n" +
					"- Infraestructura en AWS: Implementaciones complejas usando servicios como ALB, S3, CloudFront, DynamoDB, Lambda y CloudWatch.\n" +
					"- Backend en Express: Encargado de la lógica de negocio, autenticación, manejo de permisos y procesamiento de datos dinámicos.\n" +
					"- Frontend con JavaScript Vanilla: Construcción de interfaces reactivas sin frameworks, aplicando estructuras modulares y patrones robustos.\n" +
					"- Sistema de despliegue y upgrades: Implementación de procesos seguros de actualización usando AWS UpdateStack para entornos dev, QA y producción.\n" +
					"- Modelado y visualización de datos: Desarrollo de módulos para construir datasets complejos y generar reportes visuales interactivos.\n" +
					"Trabajé en estrecha colaboración con otros desarrolladores y equipos de producto, manteniendo altos estándares de calidad, seguridad y mantenibilidad en todo el stack.",
			},
			helloApp: {
				title: "Desarrollador Full Stack",
				link: "https://hello.app",
				company: "hello.app",
				period: "Mayo 2023 - Noviembre 2024 (1 año y 6 meses)",
				description:
					"Mejoró la usabilidad y la funcionalidad de la plataforma de la empresa trabajando en varios proyectos:\n" +
					"- Aplicación Móvil: Desarrollada utilizando React Native, enfocada en ofrecer una experiencia de usuario cross-platform sin problemas.\n" +
					"- Aplicación Web: Construida con Tauri, garantizando un rendimiento alto y una interfaz de usuario moderna.\n" +
					"- Sistemas de Backend: Trabajé en dos sistemas de backend distintos:\n" +
					"  - Gin: Disenado para servir archivos eficientemente.\n" +
					"  - Express: Administró la autenticación de usuarios, estadísticas y servicios especiales.\n" +
					"- Sitio Web: Desarrollado utilizando React, garantizando una experiencia de usuario responsive y interactiva.\n" +
					"Integró IPFS (InterPlanetary File System) en varios proyectos para permitir almacenamiento y compartimiento de archivos descentralizados.\n" +
					"Trabajé en equipo con equipos transversales para implementar soluciones tecnológicas escalables y eficientes, mejorando la experiencia del usuario",
			},
			notiexpress: {
				title: "Consultor Técnico (Freelance)",
				company: "Notiexpress Color",
				period: "Sin período definido",
				description:
					"Brindé soporte técnico ocasional para resolver problemas generales, incluyendo problemas de hosting, troubleshooting en PHP y WordPress, y optimización de sistemas. Colaboré con el equipo para garantizar el correcto funcionamiento de sus plataformas digitales.",
				link: "https://www.notiexpresscolor.com/",
			},
			freelance: {
				title: "Desarrollador Web (Freelance)",
				company: "Perímetro Urbano",
				period: "Enero 2022 - Presente",
				description:
					"Trabajé en varios proyectos de desarrollo web como freelancer, entregando soluciones personalizadas a los clientes.",
				link: undefined,
			}
		},
		projects: {
			title: "Proyectos",
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
					title: "Theorim.ai",
					description: "Theorim es una plataforma para modelar intuitivamente conjuntos de datos personalizados con control granular de usuarios y permisos. Soporta estructuras de datos complejas (tablas, selectores, markdown, validaciones), gestión de registros e integración con herramientas como visualizaciones interactivas y generación de contenido impulsada por IA (reportes, correos electrónicos, etc.).",
					technologies: ["JavaScript", "CSS", "HTML", "Node.js", "Express", "AWS CloudFormation", "DynamoDB", "S3"],
					website: "https://cloud.theorim.io/",
					github: ["https://github.com/Theorim-ai"],
					images: ["/assets/theorim/1.png", "/assets/theorim/2.png", "/assets/theorim/3.png"]
				},
				{
					title: "Hello App",
					description: "El frontend de hello.app",
					technologies: ["React", "TypeScript", "Tailwind CSS", "Vite", "SCSS", "IPFS"],
					github: ["https://github.com/Hello-Storage/hello-front"],
					website: "https://hello.app",
					images: ["/assets/hello-front/1.png", "/assets/hello-front/2.png", "/assets/hello-front/3.png", "/assets/hello-front/4.png"]
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
						"/assets/loans-app/4.png", "/assets/loans-app/5.png", "/assets/loans-app/6.png", "/assets/loans-app/7.png", "/assets/loans-app/8.png", "/assets/loans-app/9.png", "/assets/loans-app/10.png"]
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
					images: ["/assets/hello-ipfs-user-node-front/1.png"]
				},
				{
					title: "Autockicker",
					description: "Autoclicker es un programa que permite hacer clic en el ratón automático a una tasa determinada.",
					technologies: ["Python"],
					github: ["https://github.com/keiner5212/AutoClicker"],
					images: ["/assets/autoclicker/1.png"]
				},
				{
					title: "Hello Back",
					description: "El backend de hello.app",
					technologies: ["Go", "Node.js", "PostgreSQL", "Redis", "S3", "IPFS", "Docker"],
					github: ["priv"],
					website: "https://api-staging.joinhello.app/api/",
					images: ["/assets/backend-rep.webp"]
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
			email: "Correo electrónico",
			message: "Mensaje",
			send: "Enviar Mensaje",
		},
		footer: {
			rights:
				"Derechos reservados. Desarrollado con código original. Íconos gratuitos de terceros.",
		},
	},
};
