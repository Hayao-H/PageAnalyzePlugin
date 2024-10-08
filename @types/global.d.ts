import { Log } from "./local/io/log.d.ts";
import { Output } from "./local/io/output.d.ts";
import { Hooks } from "./net/hooks/hooks.ts";
import { Response } from "./net/http/fetch/Response.d.ts";
import { Storage } from "./local/storage/storage.d.ts";
import { Resource } from "./local/resource/resource.d.ts";
import { Tab } from "./local/tab/tab.d.ts";

declare global {
  /**
   * Niconicomeが提供するAPIのルートオブジェクトです
   */
  const application: Application;

  interface Window {
    chrome: Chrome;
  }

  /**
   * fetch API
   * @param url 取得したいページのURL
   * @param options オプション。
   */
  function fetch(url: string, options: FetchOption | null): Promise<Response>;

  /**
   * HTMLを解析
   * @param source 
   * @remarks 権限は不要です
   */
  function parseHtml(source: string): ParentNode;
}

/**
 * Niconicomeが提供するAPIのルートオブジェクトです
 */
declare const application: Application;

/**
 * fetch API
 * @param url 取得したいページのURL
 * @param options オプション。
 */
export function fetch(
  url: string,
  options: FetchOption | null,
): Promise<Response>;

/**
 * グローバルスコープに公開されている{@link application}変数のインターフェースです
 */
export interface Application {
  /**
   * Output APIです</br>
   * 使用するためにはoutput権限を取得する必要があります。
   */
  output: Output | null;

  /**
   * Hooks APIです</br>
   * 使用するためにはhooks権限を取得する必要があります。
   */
  hooks: Hooks | null;

  /**
   * Log APIです</br>
   * 使用するためにはlog権限を取得する必要があります。
   */
  log: Log | null;

  /**
   * Storage APIです</br>
   * 使用するためにはstorage権限を取得する必要があります。
   */
  storage: Storage | null;

  /**
   * Resource APIです</br>
   * 使用するためにはresource権限を取得する必要があります。
   */
  resource: Resource | null;

  /**
   * Tab APIです</br>
   * 使用するためにはtab権限を取得する必要があります。
   */
  tab: Tab | null;
}

export interface FetchOption {
  /**
   * メソッド。デフォルトはGETです。
   */
  method?: "POST" | "GET";

  /**
   * 認証情報を含める。
   * `include'を指定する場合、session権限が必要です。
   * デフォルトは'omit'です。
   */
  credentials?: "include" | "omit";

  /**
   * body。
   * POSTメソッドの場合必須です。
   */
  body?: string;

  /**
   * 追加のHeader
   */
  headers?: { [key: string]: string };
}


export interface ParentNode {
  /**
   * 要素を取得
   * @param selector 
   */
  QuerySelector(selector: string): Element | null;

  /**
   * 要素を取得
   * @param selector 
   */
  QuerySelectorAll(selector: string): Element[];
}

export interface Element {

  /**
   * 属性を取得
   * @param name 
   */
  GetAttribute(name: string): string;

  /**
   * 要素を取得
   * @param selector 
   */
  QuerySelector(selector: string): Element | null;

  /**
   * 要素を取得
   * @param selector 
   */
  QuerySelectorAll(selector: string): Element[];

  /**
   * テキストを取得
   */
  InnerHtml: string;
}

interface Chrome {
  webview: Webview;
}

interface Webview {
  addEventListener(
    eventName: "message",
    handler: (message: MessageEvent) => void,
  ): void;
  postMessage(message: object | string): void;
}
