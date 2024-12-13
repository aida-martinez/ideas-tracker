import { ID } from "appwrite";
import { ref } from "vue";
import { account } from "../appwrite";
import { type Models } from 'appwrite';
import { createSlug } from "~/utils/slugify";

const current = ref<Models.Session | null>(null); // Reference to current user object
const username = ref<string | null>(null);

export const useUserSession = () =>  {
    const register = async (username: string, email: string, password: string): Promise<void> => {
		const name = createSlug(username);

        await account.create(ID.unique(), email, password, name); // Register new user in Appwrite
        await login(email, password); // Login registered user
    };

    const login = async (email: string, password: string): Promise<void> => {
        const authUser = await account.createEmailPasswordSession(email, password); // Open user session in Appwrite
        current.value = authUser; // Pass user data to current ref

		const accountDetails = await account.get();
        username.value = accountDetails.name;

        navigateTo("/");
    };

    const logout = async (): Promise<void> => {
        await account.deleteSession("current"); // Delete Appwrite user session
        current.value = null;  // Clear current ref
		username.value = null; // Clear username on logout
        navigateTo("/");
    };

    // Check if already logged in to initialize the store.
    account.getSession('current').then(async (user: Models.Session) => {
        current.value = user;
		const accountDetails = await account.get();
        username.value = accountDetails.name;
    });

    return {
        current,
		username,
        login,
        logout,
        register,
    };
};
