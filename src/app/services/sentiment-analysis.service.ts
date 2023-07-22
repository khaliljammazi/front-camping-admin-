import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {
  private apiUrl = 'https://api.apilayer.com/sentiment/analysis';
  private apiKey = 'NPVJDUSeGlTPvO427ytBzbPbmUqmJ8Nt';

  constructor(private http: HttpClient) {}

  analyzeSentiment(body: string) {
    const httpHeaders = new HttpHeaders().set('apikey', this.apiKey);
    const requestOptions = {
      headers: httpHeaders
    };

    return this.http.post(this.apiUrl, body, requestOptions);
  }
}
