import { RawColor, text, TwColor } from 'design-system/colors';
import Size from 'design-system/sizes';
import { twMerge } from 'tailwind-merge';

interface CustomHeadingProps {
  textStr: string;
  textCol: TwColor;
  size: Size;
  className?: string;
}

interface SealedHeadingProps {
  textStr: string;
  size: Size;
  className?: string;
}

interface SealedHeadingRawProps extends SealedHeadingProps {
  color: RawColor;
}

function UseHeadingTag(textStr: string, size: Size, classes: string) {
  switch (size) {
    case 'xs':
      return (<h5 className={twMerge(classes, 'text-md')}>{textStr}</h5>);
    case 'sm':
      return (<h4 className={twMerge(classes, 'text-xl')}>{textStr}</h4>);
    case 'md':
      return (<h3 className={twMerge(classes, 'text-2xl')}>{textStr}</h3>);
    case 'lg':
      return (<h2 className={twMerge(classes, 'text-4xl')}>{textStr}</h2>);
    case 'xl':
      return (<h1 className={twMerge(classes, 'text-6xl')}>{textStr}</h1>);
  }
}

function CustomHeading({ textStr: textString, size = 'lg', textCol, className }: CustomHeadingProps) {
  const classes = twMerge(
    textCol,
    className
  );
  return UseHeadingTag(textString, size, classes);
}

function HeadingDefault({ ...props }: SealedHeadingProps) {
  return (<CustomHeading textCol={text('default')} {...props} />);
}

function HeadingDefaultCard({ ...props }: SealedHeadingProps) {
  return (<CustomHeading textCol={text('defaultCard')} {...props} />);
}

function HeadingAccent({ ...props }: SealedHeadingProps) {
  return (<CustomHeading textCol={text('accent')} {...props} />);
}

function HeadingAlert({ ...props }: SealedHeadingProps) {
  return (<CustomHeading textCol={text('alert')} {...props} />);
}

function HeadingRaw({ color, ...props }: SealedHeadingRawProps) {
  return (<CustomHeading textCol={text(color)} {...props} />);
}

export { HeadingDefault, HeadingDefaultCard, HeadingAccent, HeadingAlert, HeadingRaw };
