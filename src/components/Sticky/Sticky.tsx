import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import React, { ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { slideDown } from '../../animations/keyframes';

export interface StickyProps {
  fixedOn: number;
  containerRef?: { current: any };
  children: ReactElement;
  onSticky?: (isFixed: boolean) => void;
  notifyOnScroll?: (hasReachedPosition: boolean) => void;
  notifyPosition?: number;
}
type StyledBoxProps = {
  componentHeight?: number;
  fixedOn?: number;
  fixed?: boolean;
};

export const StyledBox = styled<React.FC<StyledBoxProps>>(
  ({ children, componentHeight, fixedOn, fixed, ...rest }) => <div {...rest}>{children}</div>
)<StyledBoxProps>(({ theme, componentHeight, fixedOn, fixed }) => ({
  '& .hold': {
    position: 'relative',
    zIndex: 2,
    boxShadow: 'none'
  },
  '& .fixed': {
    position: 'fixed',
    right: 0,
    left: 0,
    zIndex: 1500,
    boxShadow: theme.shadows[2],
    top: `${fixedOn}px`,
    transition: 'all 350ms ease-in-out',
    animation: `${slideDown} 400ms ${theme.transitions.easing.easeInOut}`
  },
  '& + .section-after-sticky': {
    paddingTop: fixed ? componentHeight : 0
  }
}));

const Sticky: React.FC<StickyProps> = ({
  fixedOn,
  containerRef,
  children,
  notifyPosition,
  notifyOnScroll,
  onSticky
}) => {
  const [fixed, setFixed] = useState(false);
  const [parentHeight, setParentHeight] = useState(0);
  const elementRef = useRef<any>(null);
  const positionRef = useRef(0);

  const scrollListener = useCallback(() => {
    if (!window) return;

    const distance = window.pageYOffset - positionRef.current;

    if (containerRef?.current) {
      const containerDistance =
        containerRef.current.offsetTop + containerRef.current?.offsetHeight - window.pageYOffset;

      if (notifyPosition && notifyOnScroll) {
        notifyOnScroll(distance <= notifyPosition && containerDistance > notifyPosition);
      }
      return setFixed(distance <= fixedOn && containerDistance > fixedOn);
    }

    if (notifyPosition && notifyOnScroll) {
      notifyOnScroll(distance >= notifyPosition);
    }

    let isFixed = distance >= fixedOn;

    if (positionRef.current === 0) {
      isFixed = distance >= fixedOn + elementRef.current?.offsetHeight;
    }

    setFixed(isFixed);
  }, []);

  useEffect(() => {
    if (!window) return;

    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', scrollListener);
    };
  }, []);

  useEffect(() => {
    if (!positionRef.current) {
      positionRef.current = elementRef.current?.offsetTop;
    }
    setParentHeight(elementRef.current?.offsetHeight || 0);
  }, [elementRef.current, children]);

  useEffect(() => {
    if (onSticky) onSticky(fixed);
  }, [fixed]);

  return (
    <StyledBox fixedOn={fixedOn} componentHeight={parentHeight} fixed={fixed}>
      <div
        className={clsx({
          hold: !fixed,
          fixed: fixed
        })}
        ref={elementRef}>
        {children}
      </div>
    </StyledBox>
  );
};

export default Sticky;
