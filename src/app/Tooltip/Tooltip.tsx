import * as React from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import * as Styled from './Tooltip.styled.ts';

const SHOW_DELAY_MS = 250;
const TOOLTIP_VERTICAL_OFFSET_PX = 5;

type OwnProps = {
  text: string;
  children: React.ReactNode;
};

export const Tooltip: React.FC<OwnProps> = ({ text, children }) => {
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isVisibleTooltip, setIsVisibleTooltip] = React.useState(false);
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = React.useState<
    HTMLButtonElement | HTMLDivElement | null
  >(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'top',
    strategy: 'fixed',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, TOOLTIP_VERTICAL_OFFSET_PX],
        },
      },
    ],
  });

  const onMouseOverHandler = () => {
    timerRef.current = setTimeout(() => {
      setIsVisibleTooltip(true);
    }, SHOW_DELAY_MS);
  };

  const onMouseOutHandler = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsVisibleTooltip(false);
  };

  return (
    <>
      {children &&
        React.Children.map(children, (child) =>
          React.cloneElement(child as React.ReactElement, {
            onMouseOver: onMouseOverHandler,
            onMouseOut: onMouseOutHandler,
            ref: setReferenceElement,
          }),
        )}
      {isVisibleTooltip &&
        ReactDOM.createPortal(
          <Styled.Tooltip
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {text}
          </Styled.Tooltip>,
          document.body,
        )}
    </>
  );
};
