import React, { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Card.module.css';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'className'> {
  /** Визуальный вариант карточки */
  variant?: CardVariant;
  /** Заголовок карточки */
  title?: string;
  /** Описание карточки */
  description?: string;
  /** URL изображения */
  image?: string;
  /** Alt-текст для изображения */
  imageAlt?: string;
  /** Действия в футере карточки */
  actions?: ReactNode;
  /** Произвольное содержимое */
  children?: ReactNode;
}

/**
 * Компонент Card — контейнер для группировки связанного контента.
 *
 * Реализует требования WCAG 2.1 AA:
 * - Семантическая разметка: <article>, <header>, <footer>
 * - Alt-текст для изображений
 * - Логическая структура заголовков
 */
export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  title,
  description,
  image,
  imageAlt = '',
  actions,
  children,
  ...rest
}) => {
  const classNames = [styles.card, styles[`variant-${variant}`]]
    .filter(Boolean)
    .join(' ');

  return (
    <article className={classNames} {...rest}>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={imageAlt} className={styles.image} />
        </div>
      )}
      <div className={styles.content}>
        {(title || description) && (
          <header className={styles.header}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}
        {children && <div className={styles.body}>{children}</div>}
        {actions && <footer className={styles.actions}>{actions}</footer>}
      </div>
    </article>
  );
};

Card.displayName = 'Card';
