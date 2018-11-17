import { IElement } from './i-element';
export interface ElementListSource {
    selector?: string;
    tagName?: string;
    class?: string;
    children?: any;
    parent?: IElement;
    mock?: boolean;
}
