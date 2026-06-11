"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { QuoteCard } from "@/components/ui/quote-component";
import { SectionHeading } from "@/components/ui/section-heading";
import { Orb } from "@/components/ui/orb";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Send, Mail, User, MessageSquare } from "lucide-react";
import { DUR, EASE, fadeLeft, fadeRight } from "@/lib/motion";

const BACKEND_URL = "https://backend.keiner-alvarado-quintero.top";

interface ContactTranslation {
	title: string;
	name: string;
	email: string;
	message: string;
	send: string;
}

interface FormState {
	name: string;
	email: string;
	message: string;
}

const Contact = ({
	t,
	lang,
}: {
	t: ContactTranslation;
	lang: string;
}) => {
	const [formData, setFormData] = useState<FormState>({
		name: "",
		email: "",
		message: "",
	});
	const [quote, setQuote] = useState({ text: "", author: "" });
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState<Partial<FormState>>({});
	const { toast } = useToast();
	const formRef = useRef<HTMLDivElement>(null);
	const quoteRef = useRef<HTMLDivElement>(null);
	const isFormInView = useInView(formRef, { once: true, margin: "-50px" });
	const isQuoteInView = useInView(quoteRef, { once: true, margin: "-50px" });
	const reduced = useReducedMotion();

	useEffect(() => {
		if (process.env.NODE_ENV === "development") return;

		const fetchQuote = async () => {
			try {
				const response = await fetch(BACKEND_URL + "/quote", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ lang }),
				});
				if (!response.ok) {
					throw new Error(`HTTP Error: ${response.status}`);
				}
				const data = await response.json();
				setQuote(data);
			} catch (error) {
				console.error("Error fetching the quote:", error);
			}
		};

		fetchQuote();
	}, [lang]);

	const validate = useCallback((): boolean => {
		const next: Partial<FormState> = {};
		if (!formData.name.trim()) next.name = "Required";
		if (!formData.email.trim()) {
			next.email = "Required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			next.email = "Invalid email";
		}
		if (!formData.message.trim()) next.message = "Required";
		setErrors(next);
		return Object.keys(next).length === 0;
	}, [formData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		if (errors[name as keyof FormState]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!validate()) return;
		setLoading(true);

		try {
			const response = await fetch(BACKEND_URL + "/send-email", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});
			if (!response.ok) {
				throw new Error(`HTTP Error: ${response.status}`);
			}
			const data = await response.json();

			if (data.success) {
				toast({
					title: "Message sent",
					description:
						"Thanks for your message. I will get back to you soon.",
				});
				setFormData({ name: "", email: "", message: "" });
				setErrors({});
			} else {
				throw new Error(data.error || "Unknown error");
			}
		} catch (error) {
			toast({
				title: "Error",
				description: "The message could not be sent, please try again.",
			});
			console.error("Error sending the message:", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section
			id="contact"
			className="relative bg-surface-1 py-20 md:py-24 lg:py-32 overflow-hidden"
		>
			<Orb
				tone="primary"
				className="w-[400px] h-[400px] -top-32 -left-32 animate-float-slow"
			/>
			<Orb
				tone="cyan"
				className="w-[350px] h-[350px] -bottom-32 -right-20 animate-float-slower"
			/>

			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 opacity-30 bg-dot-grid [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent_70%)]"
			/>

			<div className="relative z-10 mx-auto max-w-7xl px-6">
				<SectionHeading title={t.title} />

				<div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
					{/* Form */}
					<motion.div
						ref={formRef}
						initial="hidden"
						animate={isFormInView ? "visible" : "hidden"}
						variants={fadeLeft}
						transition={{
							duration: reduced ? 0 : DUR.slow,
							ease: EASE.outExpo,
						}}
					>
						<form
							onSubmit={handleSubmit}
							className="gradient-border p-6 md:p-8 space-y-5"
							noValidate
						>
							<Field
								id="name"
								label={t.name}
								name="name"
								type="text"
								value={formData.name}
								onChange={handleChange}
								error={errors.name}
								icon={<User className="size-4" />}
								placeholder="Jane Doe"
							/>
							<Field
								id="email"
								label={t.email}
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								error={errors.email}
								icon={<Mail className="size-4" />}
								placeholder="jane@example.com"
							/>
							<div>
								<label
									htmlFor="message"
									className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium"
								>
									<MessageSquare className="size-3.5 text-muted-foreground" />
									{t.message}
								</label>
								<Textarea
									id="message"
									name="message"
									rows={5}
									value={formData.message}
									onChange={handleChange}
									required
									aria-invalid={!!errors.message}
									aria-describedby={errors.message ? "message-error" : undefined}
									placeholder="Tell me about your project..."
									className="bg-surface-1/50 border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary rounded-lg resize-none"
								/>
								{errors.message && (
									<p
										id="message-error"
										role="alert"
										className="mt-1.5 text-xs text-destructive"
									>
										{errors.message}
									</p>
								)}
							</div>

							<Button
								type="submit"
								size="lg"
								disabled={loading}
								className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-medium shadow-glow-primary hover:shadow-[0_0_0_1px_hsl(var(--primary)/0.4),0_15px_50px_-10px_hsl(var(--primary)/0.6)] transition-all duration-300 active:scale-[0.98]"
							>
								{loading ? (
									<>
										<span className="size-2 rounded-full bg-primary-foreground animate-glow-pulse" />
										Sending...
									</>
								) : (
									<>
										{t.send}
										<Send className="ml-2 size-4" />
									</>
								)}
							</Button>
						</form>
					</motion.div>

					{/* Quote */}
					<motion.div
						ref={quoteRef}
						initial="hidden"
						animate={isQuoteInView ? "visible" : "hidden"}
						variants={fadeRight}
						transition={{
							duration: reduced ? 0 : DUR.slow,
							ease: EASE.outExpo,
							delay: reduced ? 0 : 0.15,
						}}
					>
						<QuoteCard
							text={quote.text || "Loading quote..."}
							author={quote.author || "Unknown"}
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

interface FieldProps {
	id: string;
	label: string;
	name: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error?: string;
	icon: React.ReactNode;
	placeholder?: string;
}

const Field = ({
	id,
	label,
	name,
	type,
	value,
	onChange,
	error,
	icon,
	placeholder,
}: FieldProps) => (
	<div>
		<label
			htmlFor={id}
			className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium"
		>
			<span className="text-muted-foreground">{icon}</span>
			{label}
		</label>
		<Input
			id={id}
			name={name}
			type={type}
			value={value}
			onChange={onChange}
			required
			aria-invalid={!!error}
			aria-describedby={error ? `${id}-error` : undefined}
			placeholder={placeholder}
			className="bg-surface-1/50 border-border focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary rounded-lg h-11"
		/>
		{error && (
			<p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-destructive">
				{error}
			</p>
		)}
	</div>
);

export default Contact;
