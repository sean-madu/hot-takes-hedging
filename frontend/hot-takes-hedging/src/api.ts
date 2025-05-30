import type { InvestmentAdvicePosts } from './types'; 


const BASE_API_URL = ""
/**
 * Fetches the latest investment advice from the /refresh endpoint.
 * @returns Promise<InvestmentAdvicePosts>
 */
export const fetchLatestAdvice = async (): Promise<InvestmentAdvicePosts> => {
    try {
        const response = await fetch(BASE_API_URL + '/refresh');
        if (!response.ok) {

            const errorBody = await response.json(); 
            throw new Error(`HTTP error! Status: ${response.status} - ${errorBody || response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching latest advice:', error);
        throw error; // Re-throw the error so React Query can catch it
    }
};

/**
 * Fetches a count many posts starting from startId
 * @param startId The starting ID of posts to retrieve.
 * @param count The number of posts to retrieve.
 * @returns Promise<InvestmentAdvicePosts>
 */
export const fetchAdvicePost = async (startId: number, count: number = 5): Promise<InvestmentAdvicePosts> => {
    try {
        const response = await fetch(BASE_API_URL + `/post?start_id=${startId}&count=${count}`);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`HTTP error! Status: ${response.status} - ${errorBody || response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching paged advice with start_id ${startId}:`, error);
        throw error;
    }
};