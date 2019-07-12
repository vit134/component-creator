## CCreator

CLI app for simple and fast create component folder with all necessary files

### Get started
#### Install

`npm i -g ccreator` or `npm i ccreator` if you need install package local

#### Usage

`ccreator <componentName> <options>` - create component with in `componentName` folder, using default settings

**Options**
`--ct` - change component type (function or class)
`--no-add` - no create additional files from `ccreator.config.json`
`--jsName` - change js file name (component or index)
`--cssname` - change css file name (component or index)



#### Configure
App can be configured using `ccreator.config.json` in the root of your project.

Config file contains the following fields: 

|  Name | Type  | Default  | Description  |
| ------------ | ------------ | ------------ | ------------ |
| tmplPath  | string  | - | path to template files  |
| indexFileName | string  | "index"  |  "index" or "component". index.js or [compoenentName].js |
| stylesFileName | string  | "component"  | "styles" or "component". styles.css or [component-name].css  |
| mockFolder | string  | "\__mock\__"  | name of folder for mocking data  |
| mockFileName |  string | "mock"  | name of mocking data file  |
| mockFileExtension | string  | "json" | extension of mocking data file  |

