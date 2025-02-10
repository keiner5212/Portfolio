import { NextRequest, NextResponse } from "next/server";
import emailjs from "@emailjs/nodejs";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        const serviceID = "service_zyto9nc";
        const templateID = "template_jhxtafk";

        const publicKey = process.env.EMAILJS_API_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_API_PRIVATE_KEY;

        if (!privateKey || !publicKey) {
            return NextResponse.json(
                { error: "Faltan las claves de EmailJS en las variables de entorno" },
                { status: 500 }
            );
        }

        const templateParams = {
            from_name: name,
            to_name: "Keiner Alvarado",
            reply_to: email,
            message: message,
        };

        const emailResponse = await emailjs.send(
            serviceID,
            templateID,
            templateParams,
            { publicKey, privateKey }
        );

        console.log("Respuesta de EmailJS:", emailResponse);
        return NextResponse.json({
            success: true,
            message: "¡Correo enviado exitosamente!",
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return NextResponse.json(
            { error: "No se pudo enviar el correo" },
            { status: 500 }
        );
    }
}
