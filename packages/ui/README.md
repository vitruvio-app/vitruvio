# Vitruvio UI

A collection of reusable UI components built with React, styled-components, Material-UI, and TypeScript. The package also includes animated components using Lottie Web and previewed in Storybook.

## Installation

To install the package, run:

```bash
yarn add @vitruvio/ui
```

## Usage

### Importing Components

To use a component, simply import it from the package and render it in your React application. Here's an example of how to use a Button component:

```tsx
import React from 'react'
import { Button } from '@vitruvio/ui'

const MyComponent = () => {
  return (
    <Button variant='contained' color='primary'>
      Click me!
    </Button>
  )
}
```

### Styling Components

```tsx
import React from 'react'
import styled from 'styled-components'
import { Button } from '@vitruvio/ui'

const MyStyledButton = styled(Button)`
  background-color: #ff0000;
  color: #ffffff;
`

const MyComponent = () => {
  return <MyStyledButton>Click me!</MyStyledButton>
}
```

### Animating Components

The package includes animated components using Lottie Web, which provides high-quality animations that can be easily integrated into your React application. To use an animated component, simply import it from the package and render it in your application.

### Previewing Components

The package includes a Storybook instance that can be used to preview the components. To run the Storybook instance, run:

```bash
yarn storybook
```

### Contributing

Contributions are welcome! To contribute to the package, please fork the repository and submit a pull request.

### License

[MIT](./LICENSE)
