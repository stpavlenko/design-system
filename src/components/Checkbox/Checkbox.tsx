import React, { forwardRef, useId, useRef, useEffect, type InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className'> {
  /** Текст подписи рядом с чекбоксом */
  label?: string;
  /** Неопределённое состояние (частичный выбор) */
  indeterminate?: boolean;
  /** Текст ошибки */
  error?: string;
  /** Вспомогательный текст */
  helperText?: string;
}

/**
 * Компонент Checkbox — переключатель с поддержкой indeterminate.
 *
 * Реализует требования WCAG 2.1 AA:
 * - Нативный input[type=checkbox] для корректной работы AT
 * - aria-checked="mixed" для indeterminate-состояния
 * - aria-describedby для ошибок и подсказок
 * - Видимый фокус-индикатор
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      indeterminate = false,
      disabled = false,
      error,
      helperText,
      id: externalId,
      checked,
      onChange,
      ...rest
    },
    externalRef
  ) => {
    const generatedId = useId();
    const inputId = externalId || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const internalRef = useRef<HTMLInputElement>(null);

    const setRef = (el: HTMLInputElement | null) => {
      (internalRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
      if (typeof externalRef === 'function') externalRef(el);
      else if (externalRef)
        (externalRef as React.MutableRefObject<HTMLInputElement | null>).current = el;
    };

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const hasError = Boolean(error);

    const describedBy =
      [hasError ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') ||
      undefined;

    const boxClassNames = [
      styles.box,
      checked && !indeterminate ? styles.boxChecked : '',
      indeterminate ? styles.boxIndeterminate : '',
      disabled ? styles.boxDisabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    const wrapperClassNames = [
      styles.wrapper,
      disabled ? styles.disabled : '',
      hasError ? styles.hasError : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        <label className={wrapperClassNames} htmlFor={inputId}>
          <input
            ref={setRef}
            id={inputId}
            type="checkbox"
            className={styles.input}
            checked={checked}
            disabled={disabled}
            aria-checked={indeterminate ? 'mixed' : undefined}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            onChange={onChange}
            {...rest}
          />
          <span className={boxClassNames} aria-hidden="true">
            {indeterminate && (
              <svg
                width="8"
                height="2"
                viewBox="0 0 8 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {!indeterminate && checked && (
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4L3.5 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          {label && <span className={styles.label}>{label}</span>}
        </label>

        {hasError && (
          <span id={errorId} className={styles.errorText} role="alert">
            {error}
          </span>
        )}
        {!hasError && helperText && (
          <span id={helperId} className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
