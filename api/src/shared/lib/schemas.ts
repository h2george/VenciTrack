import { z } from "zod";

/**
 * Login Schema
 */
export const LoginSchema = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z.string().min(1, { message: "La contraseña es requerida" }),
});

/**
 * Registration Schema
 */
export const RegisterSchema = z.object({
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z.string().min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    name: z.string().min(2, { message: "El nombre es demasiado corto" }),
});

/**
 * Document Creation Schema
 */
export const DocumentSchema = z.object({
    title: z.string().min(1, { message: "El título es requerido" }),
    documentTypeId: z.string().min(1, { message: "El tipo de documento es requerido" }),
    subjectId: z.string().min(1, { message: "El sujeto es requerido" }),
    expiryDate: z.string().datetime({ message: "Fecha de expiración inválida" }),
    alias: z.string().optional(),
    status: z.string().optional(),
});
