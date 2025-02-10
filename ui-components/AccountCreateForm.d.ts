import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AccountCreateFormInputValues = {
    account_name?: string;
    account_id?: string;
    description?: string;
};
export declare type AccountCreateFormValidationValues = {
    account_name?: ValidationFunction<string>;
    account_id?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AccountCreateFormOverridesProps = {
    AccountCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    account_name?: PrimitiveOverrideProps<TextFieldProps>;
    account_id?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AccountCreateFormProps = React.PropsWithChildren<{
    overrides?: AccountCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AccountCreateFormInputValues) => AccountCreateFormInputValues;
    onSuccess?: (fields: AccountCreateFormInputValues) => void;
    onError?: (fields: AccountCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AccountCreateFormInputValues) => AccountCreateFormInputValues;
    onValidate?: AccountCreateFormValidationValues;
} & React.CSSProperties>;
export default function AccountCreateForm(props: AccountCreateFormProps): React.ReactElement;
