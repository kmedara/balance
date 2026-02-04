
export type QUERY<T> = { query: { [K in keyof T]: T[K] | T[K][] } }
export type DATA<T> = { data: Required<{ [K in keyof T]: T[K] }> }
export type PATCHDATA<T> = { patch: { [K in keyof T]?: T[K] } }

export type PATH_PARAMETERS<T> = { [K in keyof T]: string }[]
export type URI<T extends string> = { url: T }
export type RESPONSE<T> = { response: { [K in keyof T]: T[K] } }
export type ENDPOINT = URI<any> //& Partial<PATH_PARAMETERS<any> & QUERY<any> & DATA<any> & PATCHDATA<any> & RESPONSE<any>>;

export type GET<T extends ENDPOINT & T extends PATCHDATA<any> ? "Endpoint is misconfigured" : unknown> = T

// export type GET_USERS = GET<{url: '', query: {d: '' }, patch: {}}>
// export type POST<T extends ENDPOINT & T extends QUERY<any> | PATCHDATA<any> ? "Endpoint is misconfigured" : unknown> = T

// export type PUT<T extends ENDPOINT & T extends PATCHDATA<any> | QUERY<any> ? "Endpoint is misconfigured" : unknown > = T

// export type PATCH<T extends ENDPOINT & T extends DATA<any> | QUERY<any> ? "Endpoint is misconfigured" : unknown> = T

// export type DELETE<T extends ENDPOINT & T extends DATA<any> | QUERY<any> | PATCHDATA<any> ? "Endpoint is misconfigured" : unknown> = T

// export type EndpointMap = Record<string, ENDPOINT>