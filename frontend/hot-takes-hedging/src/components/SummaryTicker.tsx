import type { InvestmentAdvice } from "../types"

import Ticker from "./Ticker"
import AdviceSummaryCard from "./AdviceSummaryCard"
import { useTheme, useMediaQuery } from "@mui/material"

interface SummaryTickerProps {
    advice: InvestmentAdvice
    speed: number
    displayOnMobile?: boolean
}

const SummaryTicker: React.FC<SummaryTickerProps> = ({ advice, speed, displayOnMobile = true }) => {

    const summaryCards = advice.length > 0 ? advice.map((item, index) => (
        <AdviceSummaryCard key={index} advice={item} />
    )) : null;

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return <>
        {summaryCards && (!isMobile || displayOnMobile) && <Ticker items={summaryCards} speed={speed} />}
    </>
}

export default SummaryTicker