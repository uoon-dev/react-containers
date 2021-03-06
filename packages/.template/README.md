# @zendeskgarden/container-{{component}} [![npm version][npm version badge]][npm version link]

[npm version badge]: https://flat.badgen.net/npm/v/@zendeskgarden/container-{{component}}
[npm version link]: https://www.npmjs.com/package/@zendeskgarden/container-{{component}}

This package includes containers relating to {{component}} in the
[Garden Design System](https://zendeskgarden.github.io/).

## Installation

```sh
npm install @zendeskgarden/container-{{component}}
```

## Usage

For live examples check out our [storybook](https://zendeskgarden.github.io/react-containers).

### useExample

```jsx static
import { useExample } from '@zendeskgarden/container-{{component}}';

const Example = () => {
  const { getExampleProps } = useExample();

  return <div {...getExampleProps()} />;
};
```

### ExampleContainer

```jsx static
import { ExampleContainer } from '@zendeskgarden/container-{{component}}';

<ExampleContainer>{({ getExampleProps }) => <div {...getExampleProps()} />}</ExampleContainer>;
```

<!--
  TODO:

  * [ ] Add {{component}} to root README table.
  * [ ] Add {{component}} stories.js.
  * [ ] Add {{component}} to demo `index.html`.
  * [ ] Delete this comment block.
-->
