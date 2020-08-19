/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { createRef } from 'react';

import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import { AccordionContainer, useAccordion, IUseAccordionReturnValue } from './src';

export const Container = () => {
  const size = number('Sections', 5, { range: true, min: 1, max: 9 });
  const sections = Array(size)
    .fill(undefined)
    .map(() => createRef());

  const Accordion = ({ expandable = true, collapsible = true } = {}) => (
    <AccordionContainer expandable={expandable} collapsible={collapsible}>
      {({
        getHeaderProps,
        getTriggerProps,
        getPanelProps,
        expandedSections,
        disabledSections
      }: IUseAccordionReturnValue) => (
        <div style={{ width: 300 }}>
          {sections.map((section, index) => {
            const disabled = disabledSections.indexOf(index) !== -1;
            const hidden = expandedSections.indexOf(index) === -1;

            return (
              <div key={index}>
                <div {...getHeaderProps({ ariaLevel: 2 })}>
                  <div
                    {...getTriggerProps({
                      index,
                      disabled,
                      style: {
                        WebkitAppearance: 'button',
                        border: '1px solid',
                        opacity: disabled ? 0.4 : 1,
                        padding: 1,
                        cursor: 'pointer'
                      }
                    })}
                  >
                    {`Trigger ${index + 1}`}
                  </div>
                </div>
                <p
                  {...getPanelProps({
                    index,
                    hidden
                  })}
                >
                  {`[Panel ${index + 1}] `}
                  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                  daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                </p>
              </div>
            );
          })}
        </div>
      )}
    </AccordionContainer>
  );

  return (
    <Accordion
      expandable={boolean('Expandable', true)}
      collapsible={boolean('Collapsible', true)}
    />
  );
};

export const Hook = () => {
  const size = number('Sections', 5, { range: true, min: 1, max: 9 });
  const sections = Array(size)
    .fill(undefined)
    .map(() => createRef());

  const Accordion = ({ expandable = true, collapsible = true } = {}) => {
    const {
      getHeaderProps,
      getTriggerProps,
      getPanelProps,
      expandedSections,
      disabledSections
    } = useAccordion({ expandable, collapsible });

    return (
      <>
        <h1 style={{ paddingTop: '210px', marginBottom: '25px', background: 'green' }}>content</h1>
        <h1 style={{ paddingTop: '210px', marginBottom: '25px', background: 'green' }}>content</h1>
        <h1 style={{ paddingTop: '210px', marginBottom: '25px', background: 'green' }}>content</h1>
        <h1 style={{ paddingTop: '210px', marginBottom: '25px', background: 'green' }}>content</h1>
        <h1 style={{ paddingTop: '210px', marginBottom: '25px', background: 'green' }}>content</h1>
        <div style={{ width: 300 }}>
          {sections.map((section, index) => {
            const disabled = disabledSections.indexOf(index) !== -1;
            const hidden = expandedSections.indexOf(index) === -1;

            return (
              <div key={index}>
                <h2 {...getHeaderProps({ role: null, ariaLevel: null })}>
                  <button
                    {...getTriggerProps({
                      index,
                      role: null,
                      tabIndex: null,
                      disabled,
                      style: { width: '100%', textAlign: 'inherit' }
                    })}
                  >
                    {`Trigger ${index + 1}`}
                  </button>
                </h2>
                <section
                  {...getPanelProps({
                    index,
                    role: null,
                    hidden
                  })}
                >
                  {`[Panel ${index + 1}] `}
                  Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion
                  daikon amaranth tatsoi tomatillo melon azuki bean garlic.
                </section>
              </div>
            );
          })}
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </>
    );
  };

  return (
    <Accordion
      expandable={boolean('Expandable', false)}
      collapsible={boolean('Collapsible', true)}
    />
  );
};

Container.story = {
  name: 'AccordionContainer'
};

Hook.story = {
  name: `useAccordion`,
  parameters: {
    docs: {
      storyDescription: `The \`useAccordion\` hook manages toggle state and required accessibility
      attributes for a group of sections.`
    }
  }
};

export default {
  component: AccordionContainer,
  title: 'Accordion Container',
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: `A container component which wraps the useAccordion hook.`
  }
};