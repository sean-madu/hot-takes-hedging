export type InvestmentAdviceItem = {
    "Ticker Symbol/Asset Name": string;
    "Class": string;
    "Strategic Recommendation": string;
    "Confidence (0 - 10)": number;
    "Rationale": string;
    "Future Search Term"?: string[];
    "Asset explanation"?: string;    
    "Amount to Invest/Sell"?: string; 
    "Risk Profile": string;
  };
  
  export type InvestmentAdvice = InvestmentAdviceItem[];
  