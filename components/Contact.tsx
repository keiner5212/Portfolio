"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Quote from "./ui/quote-component";
import { motion, useInView } from "framer-motion";

const BACKEND_URL = 'https://backend.keiner-alvarado-quintero.top'

const Contact = ({ t, lang }: { t: any, lang: string }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [quote, setQuote] = useState({ text: "", author: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const quoteRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isFormInView = useInView(formRef, { once: true });
  const isQuoteInView = useInView(quoteRef, { once: true });

  useEffect(() => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          description: "Thanks for your message. I will get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
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
    <motion.section 
      id="contact" 
      className="bg-background py-20"
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="mb-12 text-center text-3xl font-bold"
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t.title}
          <span className="section-accent" />
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          {/* Form */}
          <motion.div 
            className="w-full md:w-1/2 max-w-md"
            ref={formRef}
            initial={{ x: -50, opacity: 0 }}
            animate={isFormInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
              >
                <label htmlFor="name" className="mb-2 block text-sm font-medium">{t.name}</label>
                <Input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label htmlFor="email" className="mb-2 block text-sm font-medium">{t.email}</label>
                <Input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isFormInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <label htmlFor="message" className="mb-2 block text-sm font-medium">{t.message}</label>
                <Textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isFormInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: "spring", delay: 0.7 }}
              >
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? "Sending..." : t.send}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Quote */}
          <motion.div 
            className="w-full md:w-1/2 max-w-md"
            ref={quoteRef}
            initial={{ x: 50, opacity: 0 }}
            animate={isQuoteInView ? { x: 0, opacity: 1 } : {}}
            transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
          >
            <Quote 
              text={quote.text || "Loading quote..."} 
              author={quote.author || "Unknown"} 
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
