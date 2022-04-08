import { useContext } from "react";
import { CryptoResultContext } from './CryptoResultContext';

export const useCryptoResult = () => {
    const context = useContext(CryptoResultContext);
    return context;
}
