type QUERY<T> = {
    query: {
        [K in keyof T]: T[K] | T[K][];
    };
};
type DATA<T> = {
    data: Required<{
        [K in keyof T]: T[K];
    }>;
};
type PATCHDATA<T> = {
    patch: {
        [K in keyof T]?: T[K];
    };
};
type PATH_PARAMETERS<T> = {
    [K in keyof T]: string;
}[];
type URI<T extends string> = {
    url: T;
};
type RESPONSE<T> = {
    response: {
        [K in keyof T]: T[K];
    };
};
type ENDPOINT = URI<any> & Partial<PATH_PARAMETERS<any> & QUERY<any> & DATA<any> & PATCHDATA<any> & RESPONSE<any>>;
type GET<T extends ENDPOINT & T extends DATA<any> | PATCHDATA<any> ? "Endpoint is misconfigured" : unknown> = T;
type POST<T extends ENDPOINT & T extends QUERY<any> | PATCHDATA<any> ? "Endpoint is misconfigured" : unknown> = T;
type PUT<T extends ENDPOINT & T extends PATCHDATA<any> | QUERY<any> ? "Endpoint is misconfigured" : unknown> = T;
type PATCH<T extends ENDPOINT & T extends DATA<any> | QUERY<any> ? "Endpoint is misconfigured" : unknown> = T;
type DELETE<T extends ENDPOINT & T extends DATA<any> | QUERY<any> | PATCHDATA<any> ? "Endpoint is misconfigured" : unknown> = T;

export type { DATA, DELETE, ENDPOINT, GET, PATCH, PATCHDATA, PATH_PARAMETERS, POST, PUT, QUERY, RESPONSE, URI };
