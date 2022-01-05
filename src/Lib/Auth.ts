import { useAuthState } from "react-firebase-hooks/auth";
import { useFirebaseApp } from "./Firebase";
import { getAuth, signOut } from "@firebase/auth";
import { useEffect, useState } from "react";

export function useUser() {
	let doesntChange = "sdf";
	const auth = useAuth();
	const [user, loading, error] = useAuthState(auth);
	return { user, loading, error };
}

export function useAuth() {
	const app = useFirebaseApp();
	const [auth, setAuth] = useState(() => getAuth(app));
	useEffect(() => {
		setAuth(getAuth(app));
	}, [app]);

	return auth;
}
