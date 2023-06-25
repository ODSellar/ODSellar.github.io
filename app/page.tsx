'use client';

import { ReactElement } from 'react';
import History from './History';
import Skills from './Skills';
import LightDarkToggle from '@/components/LightDarkToggle';

export default function Home(): ReactElement {
  const yearsOfExperience = new Date().getFullYear() - 2018 - 2;

  return (
    <div className=" p-10 lg:p-20">
      <LightDarkToggle />
      <h1>{`Oliver Sellar`}</h1>
      <p>{`Hello! I'm a Full-Stack Developer with ${yearsOfExperience} years of industry experience and an interesting 2 year detour into the realm of IT management. I enjoy untangling the complex challenges that software development can present, and I'm motivated by creating applications that can make a tangible difference in people's lives.`}</p>
      <History />
      <Skills />
    </div>
  );
}
