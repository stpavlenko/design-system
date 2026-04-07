import React, { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'className'> {
  /** Визуальный вариант бейджа */
  variant?: BadgeVariant;
  /** Размер бейджа */
  size?: BadgeSize;
  /** Отображать как точку (без текста) */
  dot?: boolean;
  /** Содержимое бейджа */
  children?: ReactNode;
}

/**
 * Компонент Badge — индикатор статуса или метка.
 *
 * Реализует требования WCAG 2.1 AA:
 * - role="status" для уведомления скринридеров
 * - aria-label для dot-варианта (без видимого текста)
 */
export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  children,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const classNames = [
    styles.badge,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    dot ? styles.dot : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={classNames}
      role="status"
      aria-label={dot ? ariaLabel || variant : ariaLabel}
      {...rest}
    >
      {!dot && children}
    </span>
  );
};

Badge.displayName = 'Badge';
