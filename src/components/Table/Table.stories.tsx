import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Column, Table, TableProps } from "./Table";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/Table",
  component: Table,
} as ComponentMeta<typeof Table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Table> = (args) => <Table {...args}></Table>;

export const DefaultTable = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DefaultTable.args = {
  columns: [
    {
      id: "id",
      label: "Id",
      align: "left",
    },
    {
      id: "email",
      label: "Email",
      align: "center",
    },
    {
      id: "name",
      label: "Name",
      align: "right",
    },
  ] as Column[],
  rows: Array(25)
    .fill(0)
    .map((value, index) => {
      return {
        id: index + 1,
        name: "name" + (index + 1),
        email: "name" + (index + 1) + "@sap.com",
      };
    }),
  pagination: {
    rowPerPage: 10,
  },
} as TableProps;
