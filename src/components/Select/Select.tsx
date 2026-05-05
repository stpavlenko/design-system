import React, { forwardRef, useId, useRef, useState, useEffect } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  id?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = 'Выберите значение',
      disabled = false,
      error,
      helperText,
      id: externalId,
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = externalId || generatedId;
    const labelId = `${selectId}-label`;
    const listboxId = `${selectId}-listbox`;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const hasError = Boolean(error);
    const selectedOption = options.find(o => o.value === value);

    const describedBy =
      [hasError ? errorId : null, helperText ? helperId : null].filter(Boolean).join(' ') ||
      undefined;

    const handleToggle = () => {
      if (!disabled) setIsOpen(prev => !prev);
    };

    const handleSelect = (optValue: string) => {
      onChange?.(optValue);
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowDown' && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    const triggerClassNames = [
      styles.trigger,
      isOpen ? styles.open : '',
      hasError ? styles.hasError : '',
      disabled ? styles.disabled : '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container} ref={ref}>
        {label && (
          <span id={labelId} className={styles.label}>
            {label}
          </span>
        )}
        <div className={styles.wrapper} ref={containerRef}>
          <div
            id={selectId}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={isOpen ? listboxId : undefined}
            aria-labelledby={label ? `${labelId} ${selectId}` : undefined}
            aria-disabled={disabled || undefined}
            aria-describedby={describedBy}
            aria-invalid={hasError || undefined}
            tabIndex={disabled ? -1 : 0}
            className={triggerClassNames}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
          >
            <span className={selectedOption ? styles.value : styles.placeholder}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <span
              className={`${styles.chevron}${isOpen ? ` ${styles.chevronOpen}` : ''}`}
              aria-hidden="true"
            >
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>

          {isOpen && (
            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              className={styles.dropdown}
            >
              {options.map(option => {
                const isSelected = option.value === value;
                return (
                  <li
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    className={[styles.option, isSelected ? styles.optionSelected : '']
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSelect(option.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelect(option.value);
                      }
                    }}
                    tabIndex={0}
                  >
                    <span className={styles.checkmarkSlot} aria-hidden="true">
                      {isSelected && '✓'}
                    </span>
                    <span>{option.label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

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

Select.displayName = 'Select';
