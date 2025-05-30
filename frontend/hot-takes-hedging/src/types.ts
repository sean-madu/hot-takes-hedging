export type InvestmentAdviceItem = {
  "Ticker Symbol/Asset Name": string;
  "Class": string;
  "Strategic Recommendation": string;
  "Confidence (0 - 10)": number;
  "Rationale": string;
  "Future Search Term"?: string[];
  "Asset explanation"?: string;
  "Change to Portfolio"?: string;
  "Risk Profile": string;
};


export type Article = { "title": string, "description": string, "url": string }

export type InvestmentAdvice = InvestmentAdviceItem[];

export type InvestmentAdvicePost = {
  "Investment Advice": InvestmentAdvice,
  "articles": Article[],
  "timestamp": string,
  "hex ID": string,
}

export type InvestmentAdvicePosts = InvestmentAdvicePost[];

