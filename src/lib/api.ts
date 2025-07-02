export const API_ENDPOINTS = {
  google: 'https://www.google.com',
  starmakers: 'https://www.starmakers.com',
  sunoai: 'https://suno.ai'
};

export async function connectToService(service: keyof typeof API_ENDPOINTS) {
  try {
    const response = await fetch(API_ENDPOINTS[service], { mode: 'no-cors' });
    return { success: true, service };
  } catch (error) {
    return { success: false, service, error };
  }
}

export async function checkAllConnections() {
  const results = await Promise.all([
    connectToService('google'),
    connectToService('starmakers'),
    connectToService('sunoai')
  ]);
  return results;
}