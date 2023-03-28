const completionSpec: Fig.Spec = {
  name: "vitruvio",
  description: "",
  subcommands: [
    {
      name: "run",
      description: "Will run the vitruvio app",
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
