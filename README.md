# Tyler Icons

This library contains SVG icons converted to JavaScript modules (with TypeScript typings) to allow for distributing a tree-shakable
icon library that can be imported into applications on a per-icon basis as needed.

## TCW usage

This package only contains SVG icons that are distributed as importable JavaScript constants. It's expected that you will use these
icons with the TCW `<tcw-icon>` component to easily render them. This means you can define each component with the TCW icon registry
to easily choose the icons that your application needs, the rest will be ignored and tree shaken away!

After installing the `@tylertech/tyler-icons` package into your project, you can then import and define the icons you want to use with
the registry.

> **Important:** the icons are separated out by the following directories in the package:
> * standard: The official Google Material icons.
> * extended: The community-based Material icons.
> * custom: Tyler-owned custom Material icons.
>
> Be sure to import icons from the corresponding directory within the package. See the [Forge icon library](https://forge.tylertech.com/core-components/iconography/library) for help finding icons.

```ts
import { tylIconAccountCircle, tylIconFace } from '@tylertech/tyler-icons/standard';
import { tylIconAccountDetails } from '@tylertech/tyler-icons/extended';
import { tylIconActionLauncher } from '@tylertech/tyler-icons/custom';
import { TylerIconRegistry } from '@tylertech/tyler-components-web';

TylerIconRegistry.define([tylIconAccountCircle, tylIconFace, tylIconAccountDetails, tylIconActionLauncher]);
```

 Now you can use this icon name with the `<tcw-icon>` component:

 ```html
 <tcw-icon name="face"></tcw-icon>
 ```

 You can also load images dynamically (without registering them) by using the external CDN:

 ```html
 <tcw-icon name="face" external="standard"></tcw-icon>
 ```

## Non-TCW usage

If you aren't using TCW, you will need to use a different means for rendering the icons from this package. Each icon is exported with its
name and the SVG structure as a `string`. You can then use that SVG content to convert to HTML manually.

## Missing an icon?

This is a Tyler-wide icon library, and we want to make sure we ease the lives of people using icons as well as share our icons in a common
format. If there is an icon missing, please submit an issue to get it added. We have third-party icons as well as custom Tyler owned icons
that are distributed through this library and we'd be happy to add any that are missing for your team!

## Development

To get started developing in this repository, follow these steps:

1. Install dependencies: `npm install`
2. Update any `.svg` in the `svg` directory (if applicable).
3. Serve the demo site to test the icons: `npm run serve`
4. To build the npm package, run the following: `npm run build`

### Generating icon metadata

Icon metadata (JSON format) can also be generated from this repository. This is included 
