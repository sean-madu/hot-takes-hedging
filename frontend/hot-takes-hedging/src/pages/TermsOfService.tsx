import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import GlassCard from '../components/GlassCard'; 

const TermsOfService: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, m: 'auto', p: 2, width: '90vw' }}>
      <GlassCard>
        <Typography variant="h4" gutterBottom textAlign="center">
          Terms of Service
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3}>
          <Typography variant="body1">
            <strong>Last Updated:</strong> May 30, 2025
          </Typography>

          <Typography variant="body1">
            Please read these Terms of Service ("Terms") carefully before using <strong> hothedgedbets.com</strong> ("the Site"), operated by <strong>Sean Madu</strong> ("we," "us," or "our").
            By accessing or using the Site, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Site.
          </Typography>

          <Typography variant="h6">1. Purpose of the Site</Typography>
          <Typography variant="body1">
            The Site is intended for entertainment and educational purposes only. The content, including investment suggestions or financial analysis, is automatically generated by artificial intelligence and is not reviewed by financial professionals.
            Nothing on the Site constitutes financial, investment, legal, tax, or other professional advice. The Site is a satire-based project and all outputs are speculative and fictional in nature.
          </Typography>

          <Typography variant="h6">2. No Financial Advice</Typography>
          <Typography variant="body1">
            We are not licensed financial advisors, brokers, or investment professionals. You acknowledge and agree that:
            <ul>
              <li>No content on the Site is intended to constitute financial or investment advice.</li>
              <li>You should not rely on any information provided by the Site to make investment decisions.</li>
              <li>Any actions you take based on the content are taken at your own risk.</li>
            </ul>
          </Typography>

          <Typography variant="h6">3. Use of Site</Typography>
          <Typography variant="body1">
            You agree to use the Site only for lawful purposes. You agree not to:
            <ul>
              <li>Use the Site for any unlawful, harmful, or fraudulent activity;</li>
              <li>Reverse engineer, copy, or reuse content from the Site for misleading or commercial purposes without permission;</li>
              <li>Use the Site to obtain unauthorized access to any systems, data, or services.</li>
            </ul>
          </Typography>

          <Typography variant="h6">4. Limitation of Liability</Typography>
          <Typography variant="body1">
            To the fullest extent permitted by applicable law, in no event shall we be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from:
            <ul>
              <li>Your use or inability to use the Site;</li>
              <li>Any reliance on the AI-generated content;</li>
              <li>Any errors, omissions, or inaccuracies in the content;</li>
              <li>Any third-party services or advertisements displayed on the Site.</li>
            </ul>
            Your sole remedy for dissatisfaction with the Site is to stop using it.
          </Typography>

          <Typography variant="h6">5. Third-Party Services & Links</Typography>
          <Typography variant="body1">
            The Site may contain links to third-party websites or display third-party advertisements. We do not control and are not responsible for any content, policies, or actions of third parties. Your use of third-party services is at your own risk.
          </Typography>

          <Typography variant="h6">6. Monetization</Typography>
          <Typography variant="body1">
            The Site may include advertisements or donation links to support its maintenance and development. These do not constitute endorsements of any products or services.
          </Typography>

          <Typography variant="h6">7. Intellectual Property</Typography>
          <Typography variant="body1">
            All original content and code on the Site is the property of <strong>Sean Madu</strong>, unless otherwise stated. You may not reproduce, distribute, or exploit any part of the Site without explicit written permission.
          </Typography>

          <Typography variant="h6">8. Disclaimer of Warranties</Typography>
          <Typography variant="body1">
            The Site is provided "as is" and "as available" without warranties of any kind, express or implied. We do not warrant that:
            <ul>
              <li>The Site will be uninterrupted, error-free, or secure;</li>
              <li>The content is accurate, reliable, or up to date;</li>
              <li>Any defects will be corrected.</li>
            </ul>
          </Typography>

          <Typography variant="h6">9. Modifications to the Terms</Typography>
          <Typography variant="body1">
            We reserve the right to update or modify these Terms at any time. Any changes will be effective upon posting. It is your responsibility to review these Terms periodically.
          </Typography>

          <Typography variant="h6">10. Governing Law</Typography>
          <Typography variant="body1">
            These Terms shall be governed by and construed in accordance with the laws of the Province of <strong>Manitoba</strong>, and the federal laws of Canada applicable therein. You consent to the exclusive jurisdiction and venue of the courts located in <strong>Manitoba</strong> for all disputes arising out of or relating to the Site or these Terms.
          </Typography>

          <Typography variant="h6">11. Contact Us</Typography>
          <Typography variant="body1">
            If you have any questions about these Terms, you can contact us at:
            <br />
            <strong>Sean Madu</strong>
            <br />
            <strong>madusean2@gmail.com</strong>
            <br />
          </Typography>
        </Stack>
      </GlassCard>
    </Box>
  );
};

export default TermsOfService;
