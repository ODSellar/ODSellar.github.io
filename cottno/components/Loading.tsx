import { FC, ReactElement, useEffect, useState } from 'react';

interface IProps {}

export default function Loading({}: IProps): ReactElement | null {
  const [showLoading, setShowLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(true);
    }, 1000);

    // Cleanup the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (!showLoading) {
    return null;
  }

  return (
    <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">Loading</div>
  );
}
