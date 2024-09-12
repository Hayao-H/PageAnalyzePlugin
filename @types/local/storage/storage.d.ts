import { LocalStorage } from "./localStorage.d.ts";

export interface Storage {

    /**
     * 永続化可能なストレージ
     */
    localStorage: LocalStorage;
}