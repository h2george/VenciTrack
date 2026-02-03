import nodemailer from 'nodemailer';

export type Channel = "EMAIL" | "WHATSAPP" | "PUSH";

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
        user: "admin@boosterperu.com",
        pass: "VenciTrack2024$"
    },
});

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
    <div style="font-family: 'Inter', 'Helvetica', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0c0c; color: #ffffff; padding: 40px; border-radius: 24px;">
        <div style="text-align: center; margin-bottom: 40px;">
            <div style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, ${accentColor}20, transparent); border: 1px solid ${accentColor}40; border-radius: 16px;">
                <h1 style="color: ${accentColor}; margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase;">VenciTrack</h1>
            </div>
        </div>

        <div style="background-color: #161616; padding: 40px; border-radius: 24px; border: 1px solid #ffffff10; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
            <h2 style="color: #ffffff; margin-top: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.5px; line-height: 1.2;">
                ${isCritical ? '⚠️ ALERTA CRÍTICA' : '🛡️ PROTECCIÓN ACTIVA'}
            </h2>
            
            <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; font-weight: 500;">
                Protocolo de monitoreo detectó una proximidad de vencimiento en su plataforma.
            </p>

            <div style="margin: 32px 0; padding: 24px; background: #000000; border-radius: 16px; border-left: 4px solid ${accentColor};">
                <div style="margin-bottom: 8px;">
                    <span style="font-size: 10px; font-weight: 900; color: #666; text-transform: uppercase; letter-spacing: 2px;">Documento</span>
                    <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: 800; color: #fff;">${docName}</p>
                </div>
                <div style="margin-bottom: 8px;">
                    <span style="font-size: 10px; font-weight: 900; color: #666; text-transform: uppercase; letter-spacing: 2px;">Asociado</span>
                    <p style="margin: 4px 0 0 0; font-size: 16px; font-weight: 700; color: #a0a0a0;">${subjectName}</p>
                </div>
                <div>
                    <span style="font-size: 10px; font-weight: 900; color: ${accentColor}; text-transform: uppercase; letter-spacing: 2px;">Vencimiento</span>
                    <p style="margin: 4px 0 0 0; font-size: 20px; font-weight: 900; color: ${accentColor};">${dateStr.toUpperCase()}</p>
                </div>
            </div>

            <div style="text-align: center; margin-top: 40px;">
                <a href="${actionUrl}" style="background-color: ${accentColor}; color: white; padding: 18px 40px; border-radius: 14px; text-decoration: none; font-weight: 900; display: inline-block; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; box-shadow: 0 10px 20px ${accentColor}30;">
                    Sincronizar Bóveda
                </a>
            </div>
            
            <p style="margin-top: 40px; font-size: 11px; color: #444; text-align: center; line-height: 1.8; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                Cifrado de grado militar • VenciTrack Security Protocol v2.0<br>
                Si ya renovaste este documento, ignora este mensaje o actualiza el registro.
            </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px;">
            <p style="color: #333; font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 3px;">
                © 2026 VenciTrack Labs
            </p>
        </div>
    </div>
    `;

    if (channel === "EMAIL") {
        try {
            const info = await transporter.sendMail({
                from: '"VenciTrack Global" <admin@boosterperu.com>',
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
