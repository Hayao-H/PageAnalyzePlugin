import { isTemplateExpression } from "typescript";
import { Output } from "./local/io/output";
import { Hooks } from "./net/hooks/hooks";
import { DmcInfo } from "./net/hooks/types/dmcinfo";
import { Response } from "./net/http/fetch/Response";

declare global {

    const application: Application;

    function fetch(url: string): Promise<Response>;

    function parseHtml(source: string): Document;
}

/**
 * Niconicomeが提供するAPIのルートオブジェクトです
 */
export const application: Application;

/**
 * fetch API（現状GETのみ）
 * @param url 取得したいページのURL
 * @beta
 */
export function fetch(url: string): Promise<Response>;

/**
 * グローバルスコープに公開されている{@link application}変数のインターフェースです
 */
export interface Application {

    /**
     * output APIです</br>
     * 使用するためにはoutput権限を取得する必要があります。
     */
    output: Output | null;

    /**
     * hooks APIです</br>
     * 使用するためにはhooks権限を取得する必要があります。
     */
    hooks: Hooks | null;
}

export interface Document extends ParentNode {

}

export interface ParentNode {
    QuerySelector(selectors: string): Element | null;
}


export interface Element {
    GetAttribute(name: string): string;
}