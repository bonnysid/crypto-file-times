import { createContext } from 'react';

export enum CryptoType {
    AES = 'AES',
    DES = 'DES',
    DES3 = 'TripleDES',
    RC4 = 'RC4',
}

export enum CryptoMode {
    ECB = 'ECB',
    CBC = 'CBC',
    CFB = 'CFB',
    OFB = 'OFB',
    CTR = 'CTR'
}

export enum CryptoMethod {
    DECRYPT = 'Decrypt',
    ENCRYPT = 'Encrypt',
}

export interface IResult {
    cryptoName: string;
    startTime: number;
    endTime: number;
    cryptoType: CryptoType;
    cryptoMethod: CryptoMethod;
    cryptoMode: CryptoMode;
    cipherParams: string;
}

export interface ICryptoResultContext {
    results: IResult[];
    addResult: (...result: IResult[]) => void;
    clearResults: () => void;
}

const initialValue: ICryptoResultContext = {
    results: [],
    addResult: () => {},
    clearResults: () => {},
}

export const CryptoResultContext = createContext(initialValue);
