import React, { useState } from "react";
import {
    Box,
    Typography,
    Stack,
    Divider,
    Chip,
    Button,
    Collapse,
    LinearProgress,
} from "@mui/material";
import GlassCard from "./GlassCard";
import type { InvestmentAdviceItem } from "../types";
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

type FeaturedAdviceCardProps = {
    advice: InvestmentAdviceItem;
};

const recommendationColor = (rec: string) => {
    switch (rec) {
        case "BUY":
            return "success.main";
        case "SELL":
            return "error.main";
        case "HOLD":
            return "warning.main";
        case "WATCH":
            return "info.main";
        default:
            return "text.primary";
    }
};

const riskColor = (risk: string) => {
    switch (risk) {
        case "LOW":
            return "success.light";
        case "MEDIUM":
            return "warning.light";
        case "HIGH":
            return "error.light";
        default:
            return "grey.300";
    }
};


const FeaturedAdviceCard: React.FC<FeaturedAdviceCardProps> = ({ advice }) => {
    const [showRationale, setShowRationale] = useState(true);

    // Mock user feedback vote state, TODO: Implement toggle once this is actuallu coded 
    const [isLiked, setIsLiked] = useState<null | boolean>(null);
    const [upvotes, setUpvotes] = useState(6);
    const [downvotes, setDownvotes] = useState(4);

    const totalVotes = upvotes + downvotes;
    const votePercent = totalVotes > 0 ? (upvotes / totalVotes) * 100 : 50;

    return (
        <Box sx={{ maxWidth: 800, m: "auto", p: 2, width: "90vw" }}>
            <GlassCard>
                <Stack spacing={2}>
                    <Typography variant="h4" textAlign="center" fontWeight="bold">
                        {advice["Ticker Symbol/Asset Name"]} —{" "}
                        <Typography
                            component="span"
                            color={recommendationColor(advice["Strategic Recommendation"])}
                            fontWeight="bold"
                            sx={{ textTransform: "uppercase" }}
                        >
                            {advice["Strategic Recommendation"]}
                        </Typography>
                    </Typography>

                    <Stack direction="column" spacing={1}>
                        <Stack direction="row" spacing={2} justifyContent="center">

                                {/*I know its wrong but I dont want to spend time fixing this right now, commit already way too big TODO */}
                            <Button variant={(isLiked === null || !isLiked) ? "outlined" : "contained"} onClick={() => { if (isLiked === true) { setIsLiked(null); setUpvotes(v => v - 1) } else { setIsLiked(true); setUpvotes(v => v + 1) }}} startIcon={<ThumbUpOffAltIcon />}>
                            Agree
                        </Button>
                        <Button variant={(isLiked === null || isLiked) ? "outlined" : "contained"} onClick={() => { if (isLiked === false) { setIsLiked(null); setDownvotes(v => v + 1) } else { setIsLiked(false); setDownvotes(v => v - 1) } }} startIcon={<ThumbDownOffAltIcon />}>
                            Disagree
                        </Button>
                    </Stack>
                    <Box sx={{ px: 2 }}>
                        <Typography variant="caption" color="textSecondary">
                            Community Sentiment
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={votePercent}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "grey.300",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: votePercent >= 50 ? "success.main" : "error.main",
                                },
                            }}
                        />
                    </Box>
                </Stack>


                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={1}>
                    <Chip label={advice.Class} color="primary" variant="outlined" />
                    <Chip
                        label={`Risk: ${advice["Risk Profile"]}`}
                        sx={{ backgroundColor: riskColor(advice["Risk Profile"]) }}
                    />
                    <Box sx={{ width: 120 }}>
                        <Typography variant="caption" color="textSecondary">
                            Confidence
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={(advice["Confidence (0 - 10)"] / 10) * 100}
                            sx={{
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: "grey.300",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: recommendationColor(
                                        advice["Strategic Recommendation"]
                                    ),
                                },
                            }}
                        />
                    </Box>
                </Stack>

                <Divider />

                <Typography variant="subtitle1" fontWeight="bold">
                    Amount to Invest/Sell:
                </Typography>
                <Typography variant="body1" mb={2}>
                    {advice["Amount to Invest/Sell"] || "N/A"}
                </Typography>

                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => setShowRationale((prev) => !prev)}
                >
                    {showRationale ? "Hide Rationale" : "Show Rationale"}
                </Button>
                <Collapse in={showRationale}>
                    <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-line", mt: 1, mb: 2 }}
                    >
                        {advice.Rationale}
                    </Typography>
                </Collapse>

                {advice["Future Search Term"] && (
                    <>
                        <Divider />
                        <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                            Future Search Terms:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {advice["Future Search Term"].map((term) => (
                                <Chip key={term} label={term} size="small" />
                            ))}
                        </Stack>
                    </>
                )}

                {advice["Asset explanation"] && (
                    <>
                        <Divider sx={{ mt: 2 }} />
                        <Typography variant="subtitle1" fontWeight="bold" mt={1}>
                            Asset Explanation:
                        </Typography>
                        <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                            {advice["Asset explanation"]}
                        </Typography>
                    </>
                )}
            </Stack>
        </GlassCard>
    </Box >
  );
};

export default FeaturedAdviceCard;
