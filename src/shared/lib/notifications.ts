import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

import { getSMTPConfig } from "@/server/config/system";

export type Channel = "EMAIL" | "WHATSAPP" | "PUSH";


/**
 * Creates a dynamic transporter fetching latest config from DB
 */
async function createDynamicTransporter() {
    const config = await getSMTPConfig();
    return nodemailer.createTransport(config);
}

/**
 * sendNotification
 * HU-3.2: Multichannel notification center. 
 * Implements high-fidelity HTML emails with premium CSS branding.
 */
export async function sendNotification(
    subjectName: string,
    docName: string,
    expiryDate: Date,
    channel: Channel,
    actionUrl: string,
    recipientEmail: string
) {
    const dateStr = expiryDate.toLocaleDateString("es-PE", { year: 'numeric', month: 'long', day: 'numeric' });
    const diffDays = Math.ceil((expiryDate.getTime() - Date.now()) / (1000 * 3600 * 24));

    // Status Logic
    const isCritical = diffDays <= 7;
    const accentColor = isCritical ? "#E6334D" : "#1A4B8E";

    // HTML Template - Premium Redesign
    const htmlContent = `
    <div style="font-family: 'Inter', 'Helvetica', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0c0c; color: #ffffff; padding: 40px; border-radius: 32px;">
        <div style="text-align: center; margin-bottom: 40px;">
            <div style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, ${accentColor}20, transparent); border: 1px solid ${accentColor}40; border-radius: 16px;">
                <h1 style="color: ${accentColor}; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">VenciTrack</h1>
            </div>
        </div>

        <div style="background-color: #161616; padding: 40px; border-radius: 24px; border: 1px solid #ffffff10; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
            <div style="text-align: center; margin-bottom: 32px;">
                <h2 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px; line-height: 1.1;">
                    ${isCritical ? '⚠️ ACCIÓN INMEDIATA' : '🛡️ AVISO DE VENCIMIENTO'}
                </h2>
                <div style="margin-top: 12px; display: inline-block; padding: 6px 16px; background: ${accentColor}; color: white; border-radius: 100px; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px;">
                    Quedan ${diffDays} ${diffDays === 1 ? 'día' : 'días'}
                </div>
            </div>
            
            <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; font-weight: 500; text-align: center; margin-bottom: 32px;">
                Nuestro sistema de monitoreo inteligente ha detectado un vencimiento próximo que requiere su atención para evitar interrupciones.
            </p>

            <div style="margin: 32px 0; padding: 32px; background: #000000; border-radius: 20px; border: 1px solid #ffffff10;">
                <div style="margin-bottom: 24px; border-bottom: 1px solid #ffffff05; padding-bottom: 16px;">
                    <span style="font-size: 11px; font-weight: 900; color: #666; text-transform: uppercase; letter-spacing: 2px;">Documento / Trámite</span>
                    <p style="margin: 8px 0 0 0; font-size: 20px; font-weight: 800; color: #fff; line-height: 1.2;">${docName}</p>
                </div>
                
                <div style="margin-bottom: 24px; border-bottom: 1px solid #ffffff05; padding-bottom: 16px;">
                    <span style="font-size: 11px; font-weight: 900; color: #666; text-transform: uppercase; letter-spacing: 2px;">Entidad / Asociado</span>
                    <p style="margin: 8px 0 0 0; font-size: 16px; font-weight: 700; color: #a0a0a0;">${subjectName}</p>
                </div>

                <div>
                    <span style="font-size: 11px; font-weight: 900; color: ${accentColor}; text-transform: uppercase; letter-spacing: 2px;">Fecha de Vencimiento</span>
                    <p style="margin: 8px 0 0 0; font-size: 24px; font-weight: 900; color: ${accentColor};">${dateStr.toUpperCase()}</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 40px;">
                <a href="${actionUrl}" style="background-color: ${accentColor}; color: white; padding: 20px 48px; border-radius: 16px; text-decoration: none; font-weight: 900; display: inline-block; font-size: 15px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 10px 30px ${accentColor}40;">
                    Gestionar Renovación
                </a>
            </div>
            
            <p style="margin-top: 48px; font-size: 11px; color: #555; text-align: center; line-height: 1.8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                Protocolo de Seguridad VenciTrack v2.0 • Conexión Cifrada<br>
                Evite multas y sanciones gestionando sus documentos a tiempo.
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 32px;">
            <p style="color: #444; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px;">
                © 2026 VenciTrack • Inteligencia Exponencial
            </p>
        </div>
    </div>
    `;

    if (channel === "EMAIL") {
        try {
            const dynamicTransporter = await createDynamicTransporter();
            const smtpConfig = await getSMTPConfig(); // To get the 'from' address

            const info = await dynamicTransporter.sendMail({
                from: smtpConfig.from,
                to: recipientEmail,
                subject: `${isCritical ? '⚠️ ACCIÓN REQUERIDA' : '🛡️ VenciTrack'}: ${docName} (${subjectName})`,
                html: htmlContent,
            });

            console.info(`[NOTIFICATION][EMAIL] Message sent: ${info.messageId}`);
            return { success: true, message: `Email sent: ${info.messageId}` };
        } catch (error) {
            console.error(`[NOTIFICATION][EMAIL] Error sending email`, error);
            return { success: false, message: "Failed to send email" };
        }
    }

    console.info(`[NOTIFICATION][${channel}] Notification simulated.`);
    return { success: true, message: "Simulated" };
}
