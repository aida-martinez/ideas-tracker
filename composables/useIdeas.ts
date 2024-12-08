import { ID, Query} from "appwrite";
import type { Models } from "appwrite";
import { database } from "~/appwrite";
import { ref } from "vue";

const ideasDatabaseId: string = import.meta.env.VITE_DATABASE_ID;
const ideasCollectionId: string = import.meta.env.VITE_COLLECTION_ID;
const queryLimit: number = 10;

interface Idea extends Models.Document{
    title: string;
    description: string;
    userId: string;
}

const current = ref<Idea[] | null>(null); // Reference for the fetched data

const user =  useUserSession();

export const useIdeas = () => {

    // Fetch the 10 most recent ideas from the database
    // Add the list to the current reference object
    const fetch = async (): Promise<void> => {
        const response = await database.listDocuments(
            ideasDatabaseId,
            ideasCollectionId,
            [
				Query.equal("userId", user.current.value.userId),
				Query.orderDesc("$createdAt"),
				Query.limit(queryLimit)
			]
        );
        current.value = response.documents as Idea[];
    };

    // Add new idea to the database,
    // Change the value of the current object
    const add = async (idea: Idea): Promise<void> => {
        const response = await database.createDocument(
            ideasDatabaseId,
            ideasCollectionId,
            ID.unique(),
            idea
        );
        current.value = [response, ...current.value as Idea[]].slice(0, 10) as Idea[];
    };

    const edit = async (id: string): Promise<void> => {
		console.log(id);
		
        //await database.deleteDocument(ideasDatabaseId, ideasCollectionId, id);
        //await fetch(); // Refetch ideas to ensure we have 10 items
    };

    const remove = async (id: string): Promise<void> => {
        await database.deleteDocument(ideasDatabaseId, ideasCollectionId, id);
        await fetch(); // Refetch ideas to ensure we have 10 items
    };

    fetch();

    return {
        add,
        current,
        fetch,
		edit,
        remove,
    };
};
