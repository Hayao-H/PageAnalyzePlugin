export interface Resource {
    getResource(relativePath: string): string | null;
}