import { createElement } from 'react';
import type { JSX, ReactNode } from 'react';

type IntrinsicTag = keyof JSX.IntrinsicElements;

type LocalizedProps<T extends IntrinsicTag> = {
  as?: T;
  fr: ReactNode;
  en: ReactNode;
  className?: string;
};

type LocalizedHtmlProps<T extends IntrinsicTag> = {
  as?: T;
  fr: string;
  en: string;
  className?: string;
};

export function LocalizedText<T extends IntrinsicTag = 'span'>({
  as,
  fr,
  en,
  className,
}: LocalizedProps<T>) {
  const tag = (as ?? 'span') as IntrinsicTag;
  const classes = ['localized-fr', className].filter(Boolean).join(' ');
  const alternateClasses = ['localized-en', className].filter(Boolean).join(' ');

  return (
    <>
      {createElement(tag, { className: classes }, fr)}
      {createElement(tag, { className: alternateClasses }, en)}
    </>
  );
}

export function LocalizedHtml<T extends IntrinsicTag = 'div'>({
  as,
  fr,
  en,
  className,
}: LocalizedHtmlProps<T>) {
  const tag = (as ?? 'div') as IntrinsicTag;
  const classes = ['localized-fr', className].filter(Boolean).join(' ');
  const alternateClasses = ['localized-en', className].filter(Boolean).join(' ');

  return (
    <>
      {createElement(tag, {
        className: classes,
        dangerouslySetInnerHTML: { __html: fr },
      })}
      {createElement(tag, {
        className: alternateClasses,
        dangerouslySetInnerHTML: { __html: en },
      })}
    </>
  );
}
