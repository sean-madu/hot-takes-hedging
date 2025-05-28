import React from 'react';
import { Box, IconButton, Typography, Tooltip } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type ShareRowProps = {
    url: string,
    title: string
};


const ShareRow : React.FC<ShareRowProps> = ({url, title}) => {
  const encodedURL = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`,
    reddit: `https://www.reddit.com/submit?title=${encodedTitle}&url=${encodedURL}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedURL}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      // Maybe make this some kind of popup with state in the future but im getting tired of this 
      // project already TODO
      alert('Error copying link.');
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={1} mt={2}>
      <Typography variant="body1" sx={{ mr: 1 }}>
        Share:
      </Typography>
      <Tooltip title="Share on Twitter">
        <IconButton component="a" href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Reddit">
        <IconButton component="a" href={shareLinks.reddit} target="_blank" rel="noopener noreferrer">
          <RedditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on Facebook">
        <IconButton component="a" href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Share on LinkedIn">
        <IconButton component="a" href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Copy Link">
        <IconButton onClick={handleCopy}>
          <ContentCopyIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ShareRow;
