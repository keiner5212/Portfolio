"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Quote from "./ui/quote-component";

const Contact = ({ t, lang }: { t: any, lang: string }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [quote, setQuote] = useState({ text: "", author: "" });
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		const fetchQuote = async () => {
			try {
				console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
				const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/quote", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ lang }),
				});

				if (!response.ok) {
					throw new Error(`Error HTTP: ${response.status}`);
				}

				const data = await response.json();
				setQuote(data);
			} catch (error) {
				console.error("Error obteniendo la frase:", error);
			}
		};

		fetchQuote();
	}, [lang]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error(`Error HTTP: ${response.status}`);
			}

			const data = await response.json();

			if (data.success) {
				toast({
					title: "Mensaje enviado",
					description: "Gracias por tu mensaje. Me pondré en contacto contigo pronto.",
				});
				setFormData({ name: "", email: "", message: "" });
			} else {
				throw new Error(data.error || "Error desconocido");
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "No se pudo enviar el mensaje, por favor intenta de nuevo.",
			});
			console.error("Error enviando el mensaje:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id="contact" className="bg-background py-20">
			<div className="container mx-auto px-4">
				<h2 className="mb-12 text-center text-3xl font-bold">{t.title}</h2>
				<div className="flex flex-col md:flex-row gap-12 items-center justify-center">
					<div className="w-full md:w-1/2 max-w-md">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label htmlFor="name" className="mb-2 block text-sm font-medium">{t.name}</label>
								<Input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
							</div>
							<div>
								<label htmlFor="email" className="mb-2 block text-sm font-medium">{t.email}</label>
								<Input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
							</div>
							<div>
								<label htmlFor="message" className="mb-2 block text-sm font-medium">{t.message}</label>
								<Textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required />
							</div>
							<Button type="submit" className="w-full" disabled={loading}>
								{loading ? "Enviando..." : t.send}
							</Button>
						</form>
					</div>
					<div className="w-full md:w-1/2 max-w-md">
						<Quote text={quote.text || "Cargando frase..."} author={quote.author || "Desconocido"} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
