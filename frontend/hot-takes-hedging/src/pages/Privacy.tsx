import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import GlassCard from '../components/GlassCard'; // Adjust if path is different

const Privacy: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, m: 'auto', p: 2, width: '90vw' }}>
      <GlassCard>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Privacy Policy
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <Typography variant="body1">
            <strong>Last Updated:</strong> May 30, 2025
          </Typography>

          <Typography variant="body1">
            This website ("the Site") does not collect any personal information from you directly.
            However, we may use third-party services to understand basic traffic trends (like page views, referral sources, and country).
          </Typography>

          <Typography variant="h6">1. Analytics</Typography>
          <Typography variant="body1">
            The Site may use privacy-focused analytics services (such as Google Analytics, Vercel Analytics, or Plausible) to track general usage.
            These tools may use cookies or your IP address to help us understand where our users are coming from and how the site is performing.
            <br />
            No personally identifiable information (PII) is collected or stored by us.

          </Typography>

          <Typography variant="h6">2. No Account or Login Data</Typography>
          <Typography variant="body1">
            The Site does not require you to log in or create an account. As such, we do not store names, email addresses, passwords, or other personal identifiers.

          </Typography>

          <Typography variant="h6">3. Cookies</Typography>
          <Typography variant="body1">
            Some analytics tools may place minimal cookies to distinguish sessions or track return visits.
            You can control cookie behavior through your browser settings.

          </Typography>

          <Typography variant="h6">4. Donations & External Links</Typography>
          <Typography variant="body1">
            If you donate to the project or click on external links (e.g., Ko-fi, GitHub), those services may collect data in accordance with their own privacy policies. We do not control or store that data.

          </Typography>

          <Typography variant="h6">5. Contact</Typography>
          <Typography variant="body1">
            If you have any concerns or questions about privacy, you can contact us at:
            <br />
            <strong>madusean2@gmail.com</strong>

          </Typography>

          <Typography variant="body2" color="textSecondary" sx={{ mt: 3, fontStyle: 'italic' }}>
            TL;DR: We track general traffic but don’t know who you are. No personal data is collected. Your privacy is respected.
          </Typography>
        </Stack>
      </GlassCard>
    </Box>
  );
};

export default Privacy;
