/**
 * Dummy Prisma types to satisfy TypeScript after removing @prisma/client
 */
export namespace Prisma {
    export interface UserCreateInput {
        email: string;
        password: string;
        name: string;
        role?: string;
        preferences?: any;
    }

    export interface AuditLogCreateInput {
        entityType: string;
        entityId: string;
        action: string;
        description: string;
        userId?: string;
    }
}
