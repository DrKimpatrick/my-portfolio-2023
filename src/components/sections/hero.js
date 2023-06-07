import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1 style={{ marginTop: '150px' }}>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Kimanje Patrick.</h2>;
  const three = <h3 className="big-heading">Tech innovator and gamer.</h3>;

  const skills_in_intro = [
    'Node.js',
    'Next.js',
    'React.js',
    'Docker',
    'Python',
    'AWS',
    'MongoDB',
    'Kafka',
  ];

  const four = (
    <>
      <p>
        I am a highly proficient Full Stack Developer with 5 years of hands-on experience in
        designing and implementing enterprise-level systems. With expertise in technologies like
        {skills_in_intro.map((skill, i) => (
          <span key={i} style={{ color: '#ccd6f6' }}>
            {' '}
            {skill}
            {i === skills_in_intro.length - 1 ? '. ' : ','}
          </span>
        ))}
        I have successfully contributed to all phases of the software development life cycle. My
        strong problem-solving skills, quick learning ability, and collaborative mindset make me a
        valuable asset in any agile team.
      </p>
      <p>
        When I'm not at my computer, you can find me indulging in competitive video games like FIFA.
        My deep-rooted passion for gaming has propelled me to co-found{' '}
        <a href="https://swarmbyte.com/" target="_blank" rel="noreferrer">
          SwarmByte
        </a>{' '}
        and develop{' '}
        <a href="https://kapeesa.com/" target="_blank" rel="noreferrer">
          Kapeesa
        </a>
        , a revolutionary gaming platform that aims to enhance the gaming experience by connecting
        gamers worldwide.
      </p>
    </>
  );
  const five = (
    <a className="email-link" href={`mailto:${email}`}>
      Get in touch!
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
