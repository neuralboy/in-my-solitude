import { supabase } from './client';

const EDGE_FUNCTION_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/resonance-api`;

/**
 * Call the Resonance AI Edge Function
 * @param endpoint - The endpoint path (e.g., 'generate', 'consciousness', 'synchronicity')
 * @param data - The data to send
 * @returns Promise with the response data
 */
export async function callResonanceAPI<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
  try {
    const { data: responseData, error } = await supabase.functions.invoke('resonance-api', {
      body: { ...data, __endpoint: endpoint },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!responseData) {
      throw new Error('No response from API');
    }

    // Handle the response structure
    if (responseData.success && responseData.data) {
      return responseData.data as T;
    }

    if (responseData.error) {
      throw new Error(responseData.error);
    }

    return responseData as T;
  } catch (error) {
    console.error(`API call failed for endpoint: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Alternative: Direct fetch to edge function (bypasses supabase client)
 */
export async function callResonanceAPIDirect<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
  try {
    const response = await fetch(`${EDGE_FUNCTION_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'API request failed');
    }

    if (result.success && result.data) {
      return result.data as T;
    }

    return result as T;
  } catch (error) {
    console.error(`Direct API call failed for endpoint: ${endpoint}`, error);
    throw error;
  }
}

// Convenience methods for each endpoint
export const resonanceAPI = {
  generate: <T>(prompt: string, systemContext?: string, feature?: string) =>
    callResonanceAPI<T>('generate', { prompt, systemContext, feature }),

  consciousnessMap: <T>(journalText: string) =>
    callResonanceAPI<T>('consciousness', { journalText }),

  synchronicity: <T>(interest: string) =>
    callResonanceAPI<T>('synchronicity', { interest }),

  wisdom: <T>(situation: string) =>
    callResonanceAPI<T>('wisdom', { situation }),

  shadow: <T>(shadowPrompt: string) =>
    callResonanceAPI<T>('shadow', { shadowPrompt }),

  feed: <T>() =>
    callResonanceAPI<T>('feed', {}),

  intention: <T>() =>
    callResonanceAPI<T>('intention', {}),

  health: () =>
    fetch(`${EDGE_FUNCTION_URL}/health`).then(res => res.json()),
};
