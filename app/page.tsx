'use client';

import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div className=" p-10 lg:p-20">
      <h1 className=" text-5xl font-serif mb-4">{`Oliver Sellar`}</h1>
      <h2 className=" heading">{`About`}</h2>
      <p className=" text-lg">{`paragraph`}</p>
    </div>
  );
}
