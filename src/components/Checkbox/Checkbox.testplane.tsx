import React from 'react';
import { Checkbox } from './Checkbox';

export const renders: Record<string, () => React.ReactElement> = {
    default: () => (
        <div style={{ padding: '16px' }}>
            <Checkbox label="Согласен с условиями" />
        </div>
    ),
    checked: () => (
        <div style={{ padding: '16px' }}>
            <Checkbox label="Согласен с условиями" checked onChange={() => {}} />
        </div>
    ),
    indeterminate: () => (
        <div style={{ padding: '16px' }}>
            <Checkbox label="Выбрать всё" indeterminate onChange={() => {}} />
        </div>
    ),
    disabled: () => (
        <div style={{ padding: '16px' }}>
            <Checkbox label="Заблокированный пункт" disabled />
        </div>
    ),
    'all states': () => (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" checked onChange={() => {}} />
            <Checkbox label="Indeterminate" indeterminate onChange={() => {}} />
            <Checkbox label="Disabled" disabled />
        </div>
    ),
};

const RENDERS = 'src/components/Checkbox/Checkbox.testplane.tsx';

if (typeof describe !== 'undefined') {
    describe('Checkbox', () => {
        it('default state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.assertView('default state', '#root');
        });

        it('checked state', async ({ browser }) => {
            await browser.render(RENDERS, 'checked');
            await browser.assertView('checked state', '#root');
        });

        it('indeterminate state', async ({ browser }) => {
            await browser.render(RENDERS, 'indeterminate');
            await browser.assertView('indeterminate state', '#root');
        });

        it('disabled state', async ({ browser }) => {
            await browser.render(RENDERS, 'disabled');
            await browser.assertView('disabled state', '#root');
        });

        it('all states', async ({ browser }) => {
            await browser.render(RENDERS, 'all states');
            await browser.assertView('all states', '#root');
        });

        it('focus state', async ({ browser }) => {
            await browser.render(RENDERS, 'default');
            await browser.execute(() => {
                (document.querySelector('input[type="checkbox"]') as HTMLInputElement)?.focus();
            });
            await browser.assertView('focus state', '#root');
        });
    });
}
