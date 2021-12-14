import { useAuthState } from "react-firebase-hooks/auth";
import { useFirebaseApp } from "./Firebase";
import { getAuth } from "@firebase/auth";

export function useUser() {
	const app = useFirebaseApp();
	const auth = getAuth(app);
	const [user, loading, error] = useAuthState(auth);
	return { user, loading, error, signOut: auth.signOut };
}

export function useAuth() {
	const app = useFirebaseApp();
	return getAuth(app);
}
