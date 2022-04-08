import React, { FC, useCallback } from 'react';
import CryptoJS from 'crypto-js';
import { useDropzone } from 'react-dropzone';
import {
    CryptoMethod,
    CryptoMode,
    CryptoType,
    IResult
} from '../../providers/CryptoResultsProvider/CryptoResultContext';
import * as ST from './styled';
import { useCryptoResult } from '../../providers/CryptoResultsProvider/useCryptoResult';

const key = 'test-key'

const encryptDecrypt = async (file: File, cryptoMode: CryptoMode) => {
    const des = await encryptFile(file, CryptoType.DES, cryptoMode);
    const des3 = await encryptFile(file, CryptoType.DES3, cryptoMode);
    const rc2 = await encryptFile(file, CryptoType.RC4, cryptoMode);
    const ri = await encryptFile(file, CryptoType.AES, cryptoMode);

    return [
        des,
        des3,
        rc2,
        ri,
        await decryptFile(des),
        await decryptFile(des3),
        await decryptFile(rc2),
        await decryptFile(ri),
    ];
}

const encryptFile = (file: File, cryptoType: CryptoType, cryptoMode: CryptoMode): Promise<IResult> => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        const startTime = Date.now();

        reader.onload = () => {
            //@ts-ignore
            const wordArr = CryptoJS.lib.WordArray.create(reader.result);
            const cipherParams = CryptoJS[cryptoType].encrypt(wordArr, key, {mode: CryptoJS.mode[cryptoMode]}).toString();
            const endTime = Date.now();
            resolve({
                endTime,
                startTime,
                cryptoName: file.name,
                cryptoType,
                cryptoMode,
                cipherParams,
                cryptoMethod: CryptoMethod.ENCRYPT,
            })
        };

        reader.readAsArrayBuffer(file);
    });
}

const decryptFile = async ({cipherParams, cryptoMode, cryptoType, cryptoName}: IResult): Promise<IResult> => {
    const startTime = Date.now();
    await new Promise(resolve => {
        resolve(CryptoJS[cryptoType].decrypt(cipherParams, key, {mode: CryptoJS.mode[cryptoMode]}));
    });
    const endTime = Date.now();

    return {
        endTime,
        startTime,
        cryptoName,
        cryptoType,
        cryptoMode,
        cipherParams,
        cryptoMethod: CryptoMethod.DECRYPT,
    };
}

const Dropzone: FC = () => {
    const {addResult, clearResults} = useCryptoResult();
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        if (file) {
            clearResults();

            const CBC = await encryptDecrypt(file, CryptoMode.CBC);
            const CFB = await encryptDecrypt(file, CryptoMode.CFB);
            const ECB = await encryptDecrypt(file, CryptoMode.ECB);
            const OFB = await encryptDecrypt(file, CryptoMode.OFB);
            const STS = await encryptDecrypt(file, CryptoMode.CTR);
            const encryptsDecrypts = [...CBC, ...CFB, ...ECB, ...OFB, ...STS];

            addResult(...encryptsDecrypts);
        }
    }, [addResult, clearResults]);

    const {getInputProps, getRootProps} = useDropzone({
        onDrop,
    });

    return (
        <ST.Wrapper {...getRootProps()}>
            Drop file here
            <ST.Input {...getInputProps()} />
        </ST.Wrapper>
    );
}

export default Dropzone;
