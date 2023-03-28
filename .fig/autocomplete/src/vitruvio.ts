const completionSpec: Fig.Spec = {
  name: "vitruvio",
  description: "",
  subcommands: [
    {
      name: "run",
      description: "Will run the vitruvio app",
    },
    {
      name: "scaffold",
      description: "Will scaffold a new project in the packages directory",
      subcommands: [
        {
          name: "ts",
          description:
            "Will scaffold a new typescript project in the packages directory",
        },
      ],
    },
  ],
  options: [
    {
      name: ["--help", "-h"],
      description: "Show help for vitruvio",
    },
  ],
  // Only uncomment if vitruvio takes an argument
  // args: {}
};
export default completionSpec;
