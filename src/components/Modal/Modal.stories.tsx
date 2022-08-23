import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Modal } from "./Modal";

const ModalTest = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <h1>testing Modal</h1>
      <button onClick={(e) => setOpen(true)}>Open Modal</button>
      {open ? (
        <Modal
          onClose={() => {
            setOpen(false);
          }}
        >
          <h1>I am Modal Content</h1>
        </Modal>
      ) : null}
    </div>
  );
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/ModalTest",
  component: ModalTest,
} as ComponentMeta<typeof ModalTest>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof ModalTest> = (args) => <ModalTest {...args}></ModalTest>;

export const DefaultModal = Template.bind({});
