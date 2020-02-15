import { injectable } from 'inversify';

@injectable()
export class HttpService {

    get(url: string): Promise<any> {
        return this.fetch(url, {});
    }

    post(url: string, body: any): Promise<any> {
        return this.fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    delete(url: string): Promise<any> {
        return this.fetch(url, {
            method: 'DELETE'
        });
    }

    private async fetch(url: string, options: RequestInit) {
        options.credentials = 'include';
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        return response.json();
    }
}
