import {initializeApp} from "firebase/app";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    updateDoc
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCHwARW9VbAu9SnRQWwjMjmmQyqNbUL2dw",
    authDomain: "victor-wedding-2913a.firebaseapp.com",
    projectId: "victor-wedding-2913a",
    storageBucket: "victor-wedding-2913a.firebasestorage.app",
    messagingSenderId: "794246422282",
    appId: "1:794246422282:web:e49c8c0eb0c502bb6da4f3",
    measurementId: "G-V3PLR1VQJ9"
};

export const FirebaseNode = {
    INVITEES: "invitees"
} as const;

export type FirebaseNode = typeof FirebaseNode[keyof typeof FirebaseNode];

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDb = getFirestore(firebaseApp);

export const readFromFirebase = async <T = DocumentData>(node: FirebaseNode, path?: string): Promise<T | null> => {
    try {
        const docRef = path  !== undefined ? doc(firebaseDb, node, path) : doc(firebaseDb, node);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as T;
        } else {
            console.log(`No document found at ${node}/${path}`);
            return null;
        }
    } catch (error) {
        console.error(`Error reading document from ${node}/${path}:`, error);
        throw error;
    }
}



export const updateInFirebase = async (node: FirebaseNode, path: string, data: Partial<any>): Promise<boolean> => {
    try {
        const docRef = doc(firebaseDb, node, path);
        await updateDoc(docRef, data);
        return true;
    } catch (error) {
        console.error(`Error updating document at ${node}/${path}:`, error);
        throw error;
    }
}

export const readCollectionFromFirebase = async <T>(node: FirebaseNode): Promise<T[]> => {
    try {
        const collectionRef = collection(firebaseDb, node);
        const querySnapshot = await getDocs(collectionRef);
        const documents: T[] = [];
        querySnapshot.forEach((doc) => {
            documents.push({id: doc.id, ...doc.data()} as T);
        });

        return documents;
    } catch (error) {
        console.error(`Error reading collection from ${node}:`, error);
        throw error;
    }
}
