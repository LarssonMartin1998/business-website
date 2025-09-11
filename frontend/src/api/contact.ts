import { APIResult } from 'api/types';

interface SendContactMailRequestBody {
  name: string;
  email: string;
  company: string;
  message: string;
}

async function sendContactMail(body: SendContactMailRequestBody): Promise<APIResult<void>> {
  try {
    const res = await fetch('/api/v1/contact/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { state: 'temporary-failure' };
    return { state: 'success' };
  } catch {
    return { state: 'temporary-failure' };
  }
}

export { sendContactMail };
export type { SendContactMailRequestBody };
