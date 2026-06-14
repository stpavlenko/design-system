import React from 'react';
import styles from './CarCard.module.css';
import { Badge } from '../Badge/Badge';
import { Button, type ButtonVariant } from '../Button/Button';

export type CarCardBadgeVariant = 'new' | 'used' | 'sale';

export interface CarCardProps {
	/** Название автомобиля */
	title?: string;
	/** Характеристики: год, пробег, объём двигателя */
	subtitle?: string;
	/** Цена */
	price?: string;
	/** Тип бейджа */
	badge?: CarCardBadgeVariant;
	/** URL изображения автомобиля */
	image?: string;
	/** Alt-текст изображения */
	imageAlt?: string;
	/** Вариант кнопки действия */
	buttonVariant?: ButtonVariant;
	/** Заблокировать кнопку */
	buttonDisabled?: boolean;
	/** Текст кнопки */
	buttonLabel?: string;
	/** Обработчик клика по кнопке */
	onButtonClick?: () => void;
}

const BADGE_VARIANT_MAP = {
	new: 'success',
	used: 'neutral',
	sale: 'warning',
} as const;

const BADGE_LABEL_MAP = {
	new: 'Новый',
	used: 'С пробегом',
	sale: 'Скидка',
} as const;

/**
 * Компонент CarCard — карточка автомобиля для каталога.
 *
 * Реализует требования WCAG 2.1 AA:
 * - Семантический тег article
 * - alt для изображения
 * - Кнопка с описательным текстом
 */
export const CarCard: React.FC<CarCardProps> = ({
	title = 'Toyota Camry',
	subtitle = '2020 · 40 000 км · 2.5 л',
	price = '2 300 000 ₽',
	badge,
	image,
	imageAlt = '',
	buttonVariant = 'ghost',
	buttonDisabled = false,
	buttonLabel = 'Подробнее',
	onButtonClick,
}) => {
	return (
		<article className={styles.card}>
			<div className={styles.imageWrapper}>
				{image ? (
					<img src={image} alt={imageAlt} className={styles.image} />
				) : (
					<div className={styles.imagePlaceholder} aria-hidden="true" />
				)}
				{badge && (
					<div className={styles.badgeWrapper}>
						<Badge variant={BADGE_VARIANT_MAP[badge]} size="sm">
							{BADGE_LABEL_MAP[badge]}
						</Badge>
					</div>
				)}
			</div>
			<div className={styles.content}>
				{title && <p className={styles.title}>{title}</p>}
				{subtitle && <p className={styles.subtitle}>{subtitle}</p>}
				{price && <p className={styles.price}>{price}</p>}
				<div className={styles.buttonWrapper}>
					<Button
						variant={buttonVariant}
						size="sm"
						disabled={buttonDisabled}
						onClick={onButtonClick}
					>
						{buttonLabel}
					</Button>
				</div>
			</div>
		</article>
	);
};

CarCard.displayName = 'CarCard';
