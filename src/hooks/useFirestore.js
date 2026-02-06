// src/hooks/useFirestore.js
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    query,
    orderBy,
    setDoc,
} from "firebase/firestore";

import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/confic";

/**
 * Professional Firestore Hook
 * @param {string} fbCollection - Firestore collection name
 */
export const useFirestore = (fbCollection) => {
    const collectionRef = collection(db, fbCollection);

    //  CREATE
    const addDocument = async (data) => {
        const payload = {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(collectionRef, payload);
        return docRef;
    };

    // SET
    const setDocument = async (id, data) => {
        const docRef = doc(db, fbCollection, id);

        await setDoc(
            docRef,
            {
                ...data,
                updatedAt: serverTimestamp(),
            },
            { merge: true }, // keep existing fields if not provided
        );

        return true;
    };

    //  READ ONE
    const getDocument = async (id) => {
        const docRef = doc(db, fbCollection, id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) return null;
        return { id: snap.id, ...snap.data() };
    };

    //  READ ALL (latest first)
    const getAllDocuments = async () => {
        try {
            const q = query(collectionRef, orderBy("createdAt", "desc"));
            const snap = await getDocs(q);
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            console.log(`Firestore: Fetched ${data.length} documents from ${fbCollection} (ordered)`);
            return data;
        } catch (error) {
            console.warn("Ordered fetch failed:", error);
            const snap = await getDocs(collectionRef);
            const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
            console.log(`Firestore: Fetched ${data.length} documents from ${fbCollection} (unordered fallback)`);
            return data;
        }
    };

    //  UPDATE
    const updateDocument = async (id, data) => {
        const docRef = doc(db, fbCollection, id);

        await updateDoc(docRef, {
            ...data,
            updatedAt: serverTimestamp(),
        });

        return true;
    };

    //  DELETE
    const deleteDocument = async (id) => {
        const docRef = doc(db, fbCollection, id);
        await deleteDoc(docRef);
        return true;
    };

    //  IMAGE UPLOAD (Firebase Storage)
    const uploadImage = async (file, folder = "project") => {
        if (!file) throw new Error("File is required");

        try {
            // unique file name
            const fileName = `${Date.now()}_${file.name}`;
            const storagePath = `${folder}/${fileName}`;
            const storageRef = ref(storage, storagePath);

            console.log(`Firestore: Starting upload to ${storagePath}...`);

            await uploadBytes(storageRef, file);
            console.log(`Firestore: Upload successful. Getting download URL...`);

            const url = await getDownloadURL(storageRef);
            console.log(`Firestore: Image live at ${url}`);

            return { url, path: storageRef.fullPath };
        } catch (error) {
            console.error("Firestore: Image upload failed!", error);
            throw error;
        }
    };

    //  DELETE IMAGE
    const deleteImage = async (path) => {
        if (!path) return;
        const storageRef = ref(storage, path);
        await deleteObject(storageRef);
    };

    return {
        addDocument,
        getDocument,
        getAllDocuments,
        updateDocument,
        deleteDocument,
        uploadImage,
        deleteImage,
        setDocument,
    };
};
