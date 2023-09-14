import {initializeApp} from 'firebase/app';
import {getFirestore, collection} from 'firebase/firestore';

const credentials = {
    type: 'service_account',
    project_id: "tofoe-43c4c",
    private_key_id: import.meta.env.VITE_GOOGLE_PRIVATE_KEY_ID,
    private_key: import.meta.env.VITE_GOOGLE_PRIVATE_KEY,
    client_email: import.meta.env.VITE_GOOGLE_CLIENT_EMAIL,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: import.meta.env.VITE_GOOGLE_CLIENT_X509_CERT_URL,
    universe_domain: "googleapis.com"
};

export const firebaseApp = initializeApp({
    projectId: credentials.project_id,
    credential: credentials,
});

export const db = getFirestore(firebaseApp);

export const todosRef = collection(db, 'todos');