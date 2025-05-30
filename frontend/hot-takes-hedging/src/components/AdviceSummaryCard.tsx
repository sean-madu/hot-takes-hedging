import React from "react";
import { Box, Typography, Stack, Chip, Divider } from "@mui/material";

import GlassCard from "../components/GlassCard";
import type { InvestmentAdviceItem } from "../types";

type AdviceSummaryCardProps = {
    advice: InvestmentAdviceItem;
    onClick?: () => void;
};


// TODO: Maybe all these mappings should be extracted out to a hook? But everything is small rn so this is okay
// ... I think?
const summaryRiskColor = (risk: string) => {
    switch (risk) {
        case "LOW":
            return "success.main";
        case "MEDIUM":
            return "warning.main";
        case "HIGH":
            return "error.main";
        default:
            return "text.primary";
    }
};

const AdviceSummaryCard: React.FC<AdviceSummaryCardProps> = ({
    advice,
    onClick,
}) => {
    return (
        <Box sx={{ maxWidth: 400, m: "auto", p: 1, width: "90vw" }}>
            <GlassCard
                sx={{
                    cursor: onClick ? "pointer" : "default",
                    "&:hover": onClick
                        ? { boxShadow: 6, transform: "scale(1.02)", transition: "0.2s" }
                        : undefined,
                }}
                onClick={onClick}
            >
                <Stack spacing={1}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h6" fontWeight="bold">
                            {advice["Ticker Symbol/Asset Name"]}
                        </Typography>
                        <Chip label={advice.Class} size="small" />
                    </Stack>
                    <Stack >
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color={summaryRiskColor(advice["Risk Profile"])}
                        >
                            {advice["Strategic Recommendation"]}
                        </Typography>
                        <Divider />
                        {advice['Change to Portfolio'] &&
                            <Typography
                                variant="subtitle2"
                                color='success'
                                sx={{
                                    fontStyle: 'italic',
                                    opacity: 0.7,
                                }}
                            >
                                {advice['Change to Portfolio']}
                            </Typography>}
                    </Stack>

                    <Typography
                        variant="body2"
                        noWrap
                        title={advice.Rationale}
                        sx={{ color: "text.secondary" }}
                    >
                        {advice.Rationale}
                    </Typography>
                </Stack>
            </GlassCard>
        </Box>
    );
};

export default AdviceSummaryCard;
