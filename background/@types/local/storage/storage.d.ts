import { LocalStorage } from "./localStorage";

export interface Storage {

    /**
     * 永続化可能なストレージ
     */
    localStorage: LocalStorage;
}