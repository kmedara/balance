import { HttpClient } from "@angular/common/http";
import { InjectionToken } from "@angular/core";

export const GATEWAY_HTTP_TOKEN = new InjectionToken<HttpClient>('GATEWAY_HTTP_TOKEN');