/// <reference types="react" />
declare enum FieldType {
    'STRING' = "string",
    'NUMBER' = "number",
    'DATE' = "date",
    'BOOLEAN' = "boolean"
}
interface Validator {
    error: String;
    func: (value: any, type: FieldType) => Boolean;
}
interface FormField<T> {
    type: FieldType;
    value: T;
    initialValue: T;
    isValid: Boolean;
    isDirty: Boolean;
    errors: Array<String>;
    name: String;
    validators: Array<Validator>;
}
export declare const useValidateForm: (formFields: FormField<any>[]) => [{
    isDirty: any;
    isValid: boolean;
    hasErrors: boolean;
    fields: FormField<any>[];
}, import("react").Dispatch<{
    type: string;
    payload: {
        name: string;
        value: any;
        newForm: FormField<any>[];
    };
}>];
export declare const isRequired: {
    func: (value: any, fieldType: FieldType) => boolean;
    error: string;
};
export declare const isEmailAddress: {
    func: (value: any) => boolean;
    error: string;
};
export declare const isEmailAddressList: {
    func: (value: any) => any;
    error: string;
};
export declare const minLength: (min: number) => {
    func: (value: any) => boolean;
    error: string;
};
export declare const maxLength: (max: number) => {
    func: (value: any) => boolean;
    error: string;
};
export {};
//# sourceMappingURL=index.d.ts.map