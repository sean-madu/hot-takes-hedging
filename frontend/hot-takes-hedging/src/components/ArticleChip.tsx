import React from 'react';
import Chip from '@mui/material/Chip';
import type {Article} from '../types'

interface ArticleChipProps {
  article: Article;
}

const ArticleChip: React.FC<ArticleChipProps> = ({ article }) => {

  return (
    <Chip
      label={article.title}
      component="a" 
      href={article.url} 
      clickable
      target="_blank"
      rel="noopener noreferrer"
    />
  );
};

export default ArticleChip;