import React, { FC, useEffect, useMemo } from 'react';
import * as ST from './styled';
import { useCryptoResult } from '../../providers/CryptoResultsProvider/useCryptoResult';

const Results: FC = () => {
    const { results } = useCryptoResult();

    const renderedResults = useMemo(() => {
        const sortedResults = results.sort((a, b) => {
            const aTime = a.endTime - a.startTime;
            const bTime = b.endTime - b.startTime;

            if (aTime > bTime) {
                return 1;
            }

            if (aTime < bTime) {
                return -1;
            }

            return 0;
        });
        return sortedResults.map(result => (
            <ST.ResultWrapper key={result.startTime}>
                <ST.ResultName>{result.cryptoName}</ST.ResultName>
                <ST.Time>Time: <span>{result.endTime - result.startTime} ms</span></ST.Time>
                <ST.Time>Type: <span>{result.cryptoType}</span></ST.Time>
                <ST.Time>Mode: <span>{result.cryptoMode}</span></ST.Time>
                <ST.Time>Method: <span>{result.cryptoMethod}</span></ST.Time>
            </ST.ResultWrapper>
        ))
    }, [results]);

    return (
        <ST.Wrapper>
            {renderedResults}
        </ST.Wrapper>
    )
}

export default Results;
