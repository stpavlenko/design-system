import React from 'react';
import styles from './Tag.module.css';

export interface TagProps {
  /** Текст тега */
  text: string;
  /** Цвет (kind вместо variant) */
  kind?: 'default' | 'highlighted';
  /** Большой ли тег */
  isBig?: boolean;
  /** Обработчик удаления */
  onRemoveClick?: () => void;
}

export const Tag = ({ text, kind = 'default', isBig = false, onRemoveClick }: TagProps) => {
  return (
    <span
      className={`${styles.tag} ${styles[kind]} ${isBig ? styles.big : ''}`}
      style={{ marginRight: '8px', fontSize: 12 }}
    >
      {text}
      {onRemoveClick && (
        <button onClick={onRemoveClick} style={{ marginLeft: 4, color: '#FF3333' }}>
          ×
        </button>
      )}
    </span>
  );
};
