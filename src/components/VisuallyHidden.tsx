import React, { useState, useEffect } from 'react';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const VisuallyHidden: React.FC<VisuallyHiddenProps> = ({
  children,
  ...delegated
}) => {
  const [forceShow, setForceShow] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === 'Alt') {
          setForceShow(true);
        }
      };

      const handleKeyUp = () => {
        setForceShow(false);
      };

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keydown', handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return <>{children}</>;
  }

  return (
    <div className="absolute hidden p-0 -m-1 border-0 h-1 w-1" {...delegated}>
      {children}
    </div>
  );
};

export default VisuallyHidden;
