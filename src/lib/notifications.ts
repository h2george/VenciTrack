import nodemailer from 'nodemailer';

export type Channel = "EMAIL" | "WHATSAPP" | "PUSH";

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "admin@boosterperu.com",
        pass: "VenciTrack2024$" // Placeholder, will be replaced with user's provided password if provided securely or via env var.
        // NOTE: In a real production scenario, this MUST be an environment variable.
        // For this prototype/session, I will use the provided hardcoded credentials as requested, 
        // but adding it to .env.local is safer.
    },
});

export async function sendNotification(
    subjectName: string,
    docName: string,
    expiryDate: Date,
    channel: Channel,
    actionUrl: string,
    recipientEmail: string // Added recipient email
) {
    const dateStr = expiryDate.toLocaleDateString("es-PE", { year: 'numeric', month: 'long', day: 'numeric' });

    // HTML Template
    const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border-radius: 8px;">
        <div style="background: linear-gradient(135deg, #1A4B8E, #E6334D); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">VenciTrack</h1>
        </div>
        <div style="background-color: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e2e8f0; border-top: none;">
            <h2 style="color: #0f172a; margin-top: 0;">⚠️ Alerta de Vencimiento</h2>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                Hola,
            </p>
            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                El documento <strong>${docName}</strong> asociado a <strong>${subjectName}</strong> está próximo a vencer.
            </p>
            
            <div style="background-color: #fff1f2; border: 1px solid #fda4af; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 0; color: #9f1239; font-weight: bold; text-align: center;">
                    Fecha de Vencimiento: ${dateStr}
                </p>
            </div>

            <p style="color: #475569; font-size: 16px; line-height: 1.6;">
                Te recomendamos revisar este documento y realizar la renovación correspondiente para evitar inconvenientes.
            </p>

            <div style="text-align: center; margin-top: 30px;">
                <a href="${actionUrl}" style="background-color: #E6334D; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
                    Ver Documento
                </a>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #94a3b8; text-align: center;">
                Este es un mensaje automático de VenciTrack. Si ya renovaste este documento, puedes actualizar la fecha ingresando al enlace.
            </p>
        </div>
    </div>
    `;

    if (channel === "EMAIL") {
        try {
            const info = await transporter.sendMail({
                from: '"VenciTrack Alertas" <admin@boosterperu.com>', // sender address
                to: recipientEmail, // list of receivers
                subject: `⚠️ Vencimiento Próximo: ${docName} - ${subjectName}`, // Subject line
                html: htmlContent, // html body
            });

            console.info(`[NOTIFICATION][EMAIL] Message sent: ${info.messageId}`);
            return { success: true, message: `Email sent: ${info.messageId}` };
        } catch (error) {
            console.error(`[NOTIFICATION][EMAIL] Error sending email`, error);
            return { success: false, message: "Failed to send email" };
        }
    }

    // Fallback for other channels (not implemented)
    console.info(`[NOTIFICATION][${channel}] Notification simulated.`);
    return { success: true, message: "Simulated" };
}
