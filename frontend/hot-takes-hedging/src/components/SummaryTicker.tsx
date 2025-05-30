import type { InvestmentAdvice } from "../types"

import Ticker from "./Ticker"
import AdviceSummaryCard from "./AdviceSummaryCard"

interface SummaryTickerProps{
    advice: InvestmentAdvice
    speed: number
}

const SummaryTicker: React.FC<SummaryTickerProps> = ({advice, speed}) => {

    const summaryCards = advice.length > 0 ? advice.map((item, index) => (
        <AdviceSummaryCard key={index} advice={item} />
    )) : null;

    return <>
        {summaryCards && <Ticker items={summaryCards} speed={speed}/>}
    </>
}

export default SummaryTicker