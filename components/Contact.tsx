"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "emailjs-com";

const Contact = ({ t }: { t: any }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		try {
			await emailjs.send(
				"service_zyto9nc",
				"template_jhxtafk",
				{
					to_name: "Keiner",
					from_name: formData.name,
					message: formData.message,
          reply_to: formData.email,
				},
				"a26zBLFLsEyxlw-c1"
			);

			toast({
				title: "Mensaje enviado",
				description:
					"Gracias por tu mensaje. Me pondré en contacto contigo pronto.",
			});
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			toast({
				title: "Error",
				description:
					"No se pudo enviar el mensaje, por favor intenta de nuevo.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<section id="contact" className="bg-background py-20">
			<div className="container mx-auto px-4">
				<h2 className="mb-12 text-center text-3xl font-bold">
					{t.title}
				</h2>
				<form
					onSubmit={handleSubmit}
					className="mx-auto max-w-md space-y-6"
				>
					<div>
						<label
							htmlFor="name"
							className="mb-2 block text-sm font-medium"
						>
							{t.name}
						</label>
						<Input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label
							htmlFor="email"
							className="mb-2 block text-sm font-medium"
						>
							{t.email}
						</label>
						<Input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label
							htmlFor="message"
							className="mb-2 block text-sm font-medium"
						>
							{t.message}
						</label>
						<Textarea
							id="message"
							name="message"
							rows={4}
							value={formData.message}
							onChange={handleChange}
							required
						/>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? "Enviando..." : t.send}
					</Button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
