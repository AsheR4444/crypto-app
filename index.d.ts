// Декларация типов для подключаемых ассетов
declare module '*.png';
declare module '*.jpg';
declare module '*.css';
declare module '*.svg' {
    const value: any;
    export default value;
}
declare module 'react-imask';
