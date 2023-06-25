import HistoryCard from '@/components/HistoryCard';
import Link from 'next/link';
import { ReactElement } from 'react';

interface IProps {}

export default function History({}: IProps): ReactElement {
  return (
    <>
      <h2 className="mt-4 -mb-4">History</h2>
      <HistoryCard
        name="Metricell"
        position="Software Developer"
        timePeriod="Febuary 2022 - Present"
        description={
          <>
            <p>
              Metricell is where I really found my stride as a Software Developer. Working in a team
              of about 15 people in offices around the world to deliver tools used by mobile
              networks in the UK and around the world. Initially working to fix bugs, then quickly
              on to developing small features and after about a year pushing forward the development
              of larger features, conducting code reviews, and helping to move the processes and
              tools used by the department forwards.
            </p>
            <br />
            <p>
              Currently, I am focused more on larger projects to gain experience designing larger
              systems. One of the larger projects that I&apos;ve worked on so far is the Asset
              Locator project, this is a tool that is designed for use by councils to lease out
              local assets to third parties such as mobile network companies. The aim of this
              project is to help facilitate the rollout of new technologies like 5G that require
              more densely clustered cell towers than previous generations of network technology.
            </p>
            <br />
            <p>
              At Metricell I learnt much more about the full development process from requirements
              gathering all the way to CI/CD and how to effectively work with a team of developers.
              I started to expand my knowledge of software development and engineering in my spare
              time by reading books, following software blogs, and working on personal projects.
            </p>
          </>
        }
        link="https://www.metricell.com/"
      />
      <HistoryCard
        name="Cottno - Personal Project"
        timePeriod="Febuary 2023 - June 2023"
        description={
          <>
            <p>
              The original idea behind Cottno was to create a website where climbers could add and
              search for outdoor climbs on a map. Climbing is one of my hobbies and the main
              motivations behind this project were to develop my understanding of mapping software,
              to explore new technology, and to actually create a real functional website from start
              to finish.
            </p>
            <br />
            <p>
              One of the big challenges of this project was deciding on which technology to use and
              learning them, as many of these technologies I would be using for the first time. The
              final tech stack was Next js for the front end and authentication, then C# .NET Core
              for the rest of the backend with a Postgres database, Tailwind for all things CSS,
              Pixi.js as a 2D graphics engine for the map, and XUnit.
            </p>
            <br />
            <p>
              Another of the larger challenges was creating the map in Pixi.js, this took quite a
              bit of time and refactoring to get to a working stable map. Some of my main aims were
              to keep the map decoupled from the rest of the website and to provide a good user
              experience with a mouse or touch screen. You can check out the code here. I&apos;m
              reasonably happy with the result though if I was to continue with the project I would
              like to refactor it as I continued to learn about mapping techniques I realise that
              some of my early decisions such as using latitude and longitude heavily might not be
              ideal.
            </p>
            <br />
            <p>
              Overall I&apos;m happy with the result of this project, I learnt a lot about the
              technologies, planning a project, the full development process, and the importance of
              testing and documentation. I&apos;m not sure if I will continue with this project in
              the future, but I&apos;m happy to have the map as a{' '}
              <Link href="/cottno">portfolio piece</Link>.
            </p>
            <br />
            <p>
              I used AWS to host the website and learnt the final lesson from this project (for now
              at least), cloud hosting isn&apos;t cheap. Even if I was able to monetise the website
              via adverts or premium features, a map website is always going to be fairly resource
              intensive and I&apos;m not confident that it would ever be able to sustain itself. So
              after launching the website for all of 2 days, I shut it down again and took the
              lessons learned to start on the next project.
            </p>
          </>
        }
        link="/cottno"
      />
      <HistoryCard
        name="The Fry Group"
        position="Software Developer / IT Manager"
        timePeriod="November 2017 - January 2022"
        description={
          <>
            <p>
              After university, I found my first graduate job at The Fry Group. I started there as a
              Junior Programmer and Help Desk Analyst as part of the IT department made up of myself
              and two others. I was tasked with migrating legacy internal tools written in Visual
              FoxPro into a more modern programming language. Left largely to my own devices, I
              worked independently to convert the internal tools over to C# WPF .NET with check-ins
              with the IT manager to make sure that I was making progress.
            </p>
            <br />
            <p>
              During my first couple of years at The Fry Group, I converted multiple small internal
              tools over to C# WPF and was working on a larger project to convert the company CRM
              (Client Relationship Management) system to WPF .NET. It was at this point tragically
              that my friend and colleague, the IT manager fell ill and was unable to work. Over
              time I picked up the responsibilities of IT Manager as these were often a higher
              priority than my own work and after about 6 months was given the title of IT manager.
            </p>
            <br />
            <p>
              I worked as the IT Manager for The Fry Group for two years, long enough to see through
              the project converting the CRM system over to WPF .NET to its end, through the
              uncertainty of the COVID-19 pandemic, and gain valuable skills in time management,
              organisation, planning, project management, and decision-making. But I craved to get
              back to creating things and the challenges of software development which lead to my
              next role at Metricell.
            </p>
          </>
        }
        link="https://www.thefrygroup.co.uk/"
      />
      <HistoryCard
        name="University of Bath"
        position="BSc Hons Computer Science"
        timePeriod="Summer 2017"
        description={
          <>
            <p>
              After studying Chemical Engineering at Bath for a year I released that it really
              wasn&apos;t something I wanted to carry on with. Weighing up my options; chemistry,
              computer science, and leaving uni to do something completely different. I decided on
              Computer Science, at this point I had studied one year of computer scene at college,
              and spent hundreds of hours in the level creator of little big planet 2, these two
              experiences pushed me towards Computer Science.
            </p>
            <br />
            <p>
              During my time at Bath I learnt the fundamentals of Software development. The modules
              that I enjoyed the most were always the ones involving programming problems and these
              were where I excelled.
            </p>
          </>
        }
        link="https://www.bath.ac.uk/"
      />
    </>
  );
}
