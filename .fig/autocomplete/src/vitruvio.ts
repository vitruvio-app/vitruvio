const completionSpec: Fig.Spec = {
  name: "vitruvio",
  description: "",
  subcommands: [{
    name: "my_subcommand",
    description: "Example subcommand",
    subcommands: [{
      name: "my_nested_subcommand",
      description: "Nested subcommand, example usage: 'vitruvio my_subcommand my_nested_subcommand'"
    }],
  }],
  options: [{
    name: ["--help", "-h"],
    description: "Show help for vitruvio",
  }],
  // Only uncomment if vitruvio takes an argument
  // args: {}
};
export default completionSpec;