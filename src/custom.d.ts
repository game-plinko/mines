declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const content: string;
    export default content;
}


declare module "*.mp3" {
    const value: string;
    export default value;
}

// If you want to import .ts files as text or a special asset:
declare module "*.ts" {
    const content: string;
    export default content;
}
