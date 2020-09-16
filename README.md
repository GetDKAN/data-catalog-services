# DKAN Data Catalog Templates
This template library allows developers to quickly construct well tested and designed data catalogs.

## Structure of library
### Pages
Pages are prebuilt pages to display information on your site. Built from multiple components, they only require some props to get make them work. 
### Components
Components in this library are the building blocks of pages. If the page design isn't what you are looking for, you can always create a custom page in your app and then import and render the components. Components may need props in order to work, which will need to be passed through in the custom app. 

## Additional information
Many features of the DKAN catalog require API calls to fetch data from the DKAN backend. The components and functions that handle these parts of the site are located in the data-catalog-components repo. This repo is for building new features from the base level. 