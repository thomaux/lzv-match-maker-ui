import { injectable } from 'inversify';

@injectable()
export class HttpService {

    get<T>(url: string): Promise<T> {
        return this.fetch(url, {});
    }

    post<T>(url: string, body: unknown): Promise<T> {
        return this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    delete(url: string): Promise<void> {
        return this.fetch(url, {
            method: 'DELETE'
        });
    }

    private async fetch<T>(url: string, options: RequestInit): Promise<T> {
        options.credentials = 'include';
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
}
