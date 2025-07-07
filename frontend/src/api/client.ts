import { createApiClient, type ApiClient } from '../generated/api/apiClient.js';
import { FetchRequestAdapter } from '@microsoft/kiota-http-fetchlibrary';
import { AnonymousAuthenticationProvider } from '@microsoft/kiota-abstractions';

let client: ApiClient | null = null;

/**
 * Get a singleton ApiClient instance.
 * @param baseUrl Base URL of the backend API.
 */
export function getApiClient(baseUrl = 'http://localhost:5000'): ApiClient {
  if (client) return client;
  const authProvider = new AnonymousAuthenticationProvider();
  const adapter = new FetchRequestAdapter(authProvider);
  adapter.baseUrl = baseUrl;
  client = createApiClient(adapter);
  return client;
}
