export interface EventHandlerInfo {
    id?: string;
    event: string;
    handler: (event: any) => void;
    keepDefault?: boolean;
}
