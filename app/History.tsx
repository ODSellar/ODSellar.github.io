/* eslint-disable react/no-unescaped-entities */
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
              Metricell is where I found my stride as a Software Developer. Working in a team of
              about 15 people in offices worldwide to deliver tools used by mobile networks
              worldwide. Initially, I worked to fix bugs, then quickly moved on to developing small
              features. After about a year, I started pushing forward the development of more
              prominent features, conducting code reviews, and helping to drive the processes and
              tools used by the department forward.
            </p>
            <br />
            <p>
              Currently, I am focused more on larger projects to gain experience designing larger
              systems. One of the larger projects I've worked on is the Asset Locator project; this
              tool is intended for councils to lease out local assets to third parties, such as
              mobile network companies. This project aims to help facilitate the rollout of new
              technologies like 5G that require more densely clustered cell towers than previous
              generations of network technology.
            </p>
            <br />
            <p>
              At Metricell, I learnt much more about the full development process, from requirements
              gathering to CI/CD and how to effectively work with a team of developers. In my spare
              time, I started expanding my software development and engineering knowledge by reading
              books, following software blogs, and working on personal projects.
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
              The idea behind Cottno was to create a mapping website where communities, such as
              climbers, divers, birdwatchers, etc., could search for and add points of interest for
              their community (outdoor climbs, dive locations, bird-watching hides, etc.). Climbing
              is one of my hobbies, and the main motivations behind this project were to develop my
              understanding of mapping software and techniques, explore new technology, and create
              an actual functional website from start to finish.
            </p>
            <br />
            <p>
              After months of work, I developed a prototype website I was happy with. I used Next.js
              for the front end and authentication, then C# ASP .NET Core 7 for the rest of the
              backend and a Postgres database. I choose to host the Website on AWS. The key features
              of the prototype were, A working map navigable by touch and mouse, debounced url
              updating to track the map's last location similar to google maps, user authentication,
              creating maps similar to how Reddit boards are created, and the ability to add and
              view points on a map with details about the point.
            </p>
            <br />
            <p>
              The project was a success. I learnt a lot about the technologies used, project
              planning, the whole development process, and the importance of testing and
              documentation. One of the main challenges was creating the map. I decided to use
              Pixi.js, a 2D graphics library, rather than a mapping library, as one of my aims was
              to learn more about mapping techniques. This took a fair amount of time and
              refactoring to get to a stable working map. I am happy with the result, though if I
              continue with the project, I would like to refactor it further; as I continued to
              learn about mapping techniques, I realised that some of my early decisions, such as
              using latitude and longitude heavily, might not be ideal.
            </p>
            <br />
            <p>
              I hosted the website on AWS but quickly realised it would cost well over £1000 a year
              to run even on minimum specs. Unfortunately, as the main website is a map, I believe
              it will always be relatively resource intensive compared to a simple website, and even
              if I managed to monetise it, I'm not confident that it would be able to sustain
              itself. Sadly, the project is mothballed for now, but I will take the lessons learned
              and experience onto the next project!
            </p>
            <br />
            <p>
              You can check out the map <Link href="/cottno">here</Link> and the code for it in this
              website's <a href="https://github.com/ODSellar/ODSellar.github.io">repo</a> in the
              cotto directory.
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
              FoxPro into a more modern programming language. Left mainly to my own devices, I
              worked independently to convert the internal tools to C# WPF .NET with check-ins with
              the IT manager to ensure I was making progress.
            </p>
            <br />
            <p>
              During my first couple of years at The Fry Group, I converted multiple small internal
              tools over to C# WPF and was working on a larger project to convert the company CRM
              (Client Relationship Management) system to WPF .NET. At this point, tragically, my
              friend and colleague, the IT Manager, fell ill and was unable to work. Over time I
              picked up the responsibilities of IT Manager as these were often a higher priority
              than my own work, and after about 6 months was given the title of IT Manager.
            </p>
            <br />
            <p>
              I worked as the IT Manager for The Fry Group for two years, long enough to see through
              the project converting the CRM system over to WPF .NET to its end, through the
              uncertainty of the COVID-19 pandemic, and to gain valuable skills in time management,
              organisation, planning, project management, and decision-making. But I craved to get
              back to creating things and the challenges of software development, which led to my
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
              At the University of Bath, I learnt the fundamentals of Software development. I took
              modules in maths, computer vision, software engineering, and user experience, to name
              a few. The modules I enjoyed the most were always the ones involving programming
              problems and were where I excelled.
            </p>
            <br />
            <p>
              For my final year project, I investigated how games could be used in education and
              created an{' '}
              <a href="https://people.bath.ac.uk/wbh22/LogicGames/games/RegExTD/index.html">
                educational game
              </a>{' '}
              to help teach regular expressions.
            </p>
          </>
        }
        link="https://www.bath.ac.uk/"
      />
    </>
  );
}
