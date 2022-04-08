import React, { FC, useCallback, useEffect, useState } from 'react';
import { CryptoResultContext, IResult } from './CryptoResultContext';

export const CryptoResultProvider: FC = ({ children }) => {
    const [results, setResults] = useState<IResult[]>([]);

    const addResult = useCallback((...result: IResult[]) => {
        setResults(prevState => [...prevState, ...result]);
    }, []);

    const clearResults = useCallback(() => {
        setResults([]);
    }, []);

    return (
        <CryptoResultContext.Provider value={{ results, addResult, clearResults }}>
            {children}
        </CryptoResultContext.Provider>
    )
}
