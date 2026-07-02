import { Type, type Static } from './typebox.js';
export declare const problemDetailsSchema: Type.TObject<{
    type: Type.TString;
    title: Type.TString;
    status: Type.TInteger;
    detail: Type.TOptional<Type.TString>;
    instance: Type.TOptional<Type.TString>;
}>;
export declare const bearerSecurity: readonly [{
    readonly bearerAuth: readonly [];
}];
export declare const publicRouteSecurity: readonly [];
export declare const pingResponseSchema: Type.TString;
export type ProblemDetails = Static<typeof problemDetailsSchema>;
//# sourceMappingURL=common.d.ts.map