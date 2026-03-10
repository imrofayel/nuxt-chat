export default defineAppConfig({
  title: "Yūgen",

  ui: {
    colors: {
      primary: "black",
      neutral: "neutral",
    },

    textarea: {
      slots: {
        base: "border-0 outline-none bg-transparent! ring-0! text-medium! px-0!",
      },
    },

    tooltip: {
      slots: {
        content: "text-tooltip!",
      },
    },

    inputMenu: {
      slots: {
        root: "alter-input",
        item: "flex gap-1.5! items-center! rounded! text-small",
        itemTrailingIcon: "hidden!",
      },
    },

    icons: {
      light: "codicon:color-mode",
      dark: "codicon:color-mode",
    },
  },
});
