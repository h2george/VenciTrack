export const fetchDocuments = async () => {
    const res = await fetch("/api/documents");
    return res.json();
};

export const createDocument = async (docData: any) => {
    const res = await fetch("/api/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docData),
    });
    return res.json();
};

export const deleteDocument = async (id: string) => {
    const res = await fetch(`/api/documents/${id}`, {
        method: "DELETE",
    });
    return res.json();
};
