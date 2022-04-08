import React, { useEffect } from 'react';
import * as ST from './styled';
import Dropzone from './components/Dropzone';
import { CryptoResultProvider } from './providers/CryptoResultsProvider/CryptoResultProvider';
import Results from './components/Results';
import { generateKeys } from './helpers/rsa';

function App() {
    useEffect(() => {
        generateKeys();
    }, []);

    return (
        <CryptoResultProvider>
            <ST.AppWrapper>
                <ST.GlobalStyle/>
                <Dropzone/>
                <Results />
            </ST.AppWrapper>
        </CryptoResultProvider>
    );
}

export default App;
