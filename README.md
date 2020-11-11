# Tyler Icons

This library contains SVG icons converted to JavaScript modules (with TypeScript typings) to allow for distributing a tree-shakable
icon library that can be imported into applications on a per-icon basis as needed.

## Development

To get started developing in this repository, follow these steps:

1. Install dependencies: `npm install`
2. [optional] Add any **new** icons to the `svg-icons` directory. 
3. Serve the demo site to test the icons: `npm run serve`
4. To build the npm package, run the following: `npm run build`

## TCW usage

This package only contains SVG icons that are distributed as importable JavaScript constants. It's expected that you will use these
icons with the TCW `<tcw-icon>` component to easily render them. This means you can define each component with the TCW icon registry
to easily choose the icons that your application needs, the rest will be ignored and tree shaken away!

After installing the `@tylertech/tyler-icons` package into your project, you can then import and define the icons you want to use with
the registry:

```ts
import { tylIcon360 }
```
