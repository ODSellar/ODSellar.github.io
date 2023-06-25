import { ReactElement } from 'react';

interface IProps {
  name: string;
  position?: string;
  timePeriod: string;
  description: JSX.Element;
  link?: string;
}

export default function HistoryCard({
  name,
  position,
  timePeriod,
  description,
  link,
}: IProps): ReactElement {
  const linkedName = link ? <a href={link}>{name}</a> : name;

  const positionString = position ? `${position},` : ``;

  return (
    <div className=" my-4">
      <h3>{linkedName}</h3>
      <p className=" mb-1">
        <i className=" font-extralight">{`${positionString} ${timePeriod}`}</i>
      </p>
      {description}
    </div>
  );
}
