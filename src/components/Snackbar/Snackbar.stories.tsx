import React, { useCallback, useEffect, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { SnackbarProvider, useSnackbar } from "./Snackbar";
export default {
  title: "ReactComponentLibrary/Snackbar",
  component: SnackbarProvider,
} as ComponentMeta<typeof SnackbarProvider>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SnackbarProvider> = (args) => {
  return <SnackbarProvider {...args}></SnackbarProvider>;
};

export const DefaultButton = Template.bind({});

const SnackbarTest = () => {
  const { show } = useSnackbar();
  const [state, setState] = useState(0);
  console.log("Rendered");
  const buttonClicked = useCallback(() => {
    setState((state) => state + 1);
    show({
      message: "Hello Toast Message",
      type: "error",
    });
  }, []);

  return <button onClick={buttonClicked}>{`button ${state}`}</button>;
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultButton.args = {
  children: <SnackbarTest />,
};
