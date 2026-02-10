import { useState, useEffect } from "react";
import { fetchDocuments, createDocument, deleteDocument } from "./doc-api";

export function useDocuments() {
    const [documents, setDocuments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const loadDocs = async () => {
        setLoading(true);
        try {
            const data = await fetchDocuments();
            if (data.success) setDocuments(data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDocs();
    }, []);

    const addDoc = async (docData: any) => {
        const res = await createDocument(docData);
        if (res.success) loadDocs();
        return res;
    };

    const removeDoc = async (id: string) => {
        const res = await deleteDocument(id);
        if (res.success) loadDocs();
        return res;
    };

    return { documents, loading, addDoc, removeDoc, refresh: loadDocs };
}
