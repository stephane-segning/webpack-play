[![Build, deploy and docker build frontend](https://github.com/stephane-segning/webpack-play/actions/workflows/build-deploy.yml/badge.svg)](https://github.com/stephane-segning/webpack-play/actions/workflows/build-deploy.yml)
[![pages-build-deployment](https://github.com/stephane-segning/webpack-play/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/stephane-segning/webpack-play/actions/workflows/pages/pages-build-deployment)

# Webpack Play

## Introduction

Webpack Play is a simple project aimed at creating a **todo list application**. Users can:
- Add new tasks
- Delete tasks

This application helps maximize organization and discipline for its users. It is built with **Typescript**,  **Javascript** and uses **[Webpack](https://webpack.js.org/)** for bundling assets and optimizing performance. 

## Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (>=14)
- [Yarn](https://yarnpkg.com/) (optional but recommended)

## Installation

Follow these steps to set up and run the project:
1. **Clone the repository**:
   ```bash
   git clone https://github.com/stephane-segning/webpack-play
2. **Install the dependencies**:
    ```bash
    yarn install
3. **Start the server**:
    ```bash
    yarn dev
This will start the webpack development server, and you can view the application at http://localhost:9000.

## Webpack Plugins

 Webpack is a powerful module bundler that can be customized with plugins to enhance the development experience and optimize builds. This project uses the following plugins:

**1. FaviconsWebpackPlugin:**

* **Purpose:** Generates a set of favicons for the application in various sizes and formats.
* **Installation:**
    ```bash
    yarn add -D favicons-webpack-plugin

* **Configuration:**
    ```js
    webpack.config.js

    const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

    plugins[
        new FaviconsWebpackPlugin({})
    ]
    

**2. EnvironmentPlugin:**

* **Purpose:** Defines environment variables that can be accessed within the application code. The EnvironmentPlugin is shorthand for using the DefinePlugin on process.env keys. 
* **Configuration:**
    ```js
    webpack.config.js

    const { EnvironmentPlugin } = require("webpack");

    plugins[
        new webpack.EnvironmentPlugin({})
    ]

**3. MiniCssExtractPlugin:**

* **Purpose:** Extracts CSS from JavaScript into separate CSS files. This improves performance by reducing the size of JavaScript bundles and enabling browser caching of CSS files.
* **Installation:**
    ```bash
    yarn add -D mini-css-extract-plugin
* **Configuration:**
    ```js
    webpack.config.js

    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    plugins[
        new MiniCssExtractPlugin({})
    ]

**4. HtmlWebpackPlugin:**

* **Purpose:** Generates an HTML file that includes the necessary scripts and stylesheets for the application. 
* **Installation:**
    ```bash
    yarn add -D html-webpack-plugin
* **Configuration:**
    ```js
    webpack.config.js

    const HtmlWebpackPlugin = require("html-webpack-plugin");

    plugins[
        new HtmlWebpackPlugin({})
    ]
    

**5. WorkboxPlugin.GenerateSW:**

* **Purpose:** Generates a service worker for Progressive Web App (PWA) functionality, enabling offline functionality, better caching and improved performance. 
* **Installation:**
    ```bash
    yarn add -D workbox-plugin

* **Configuration:**
    ```js
    webpack.config.js
    const WorkboxPlugin = require("workbox-webpack-plugin");

    plugins[
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true
        })
    ]


**Key Benefits:**

* **Improved Performance:** Extracting CSS and using a service worker can significantly improve the loading speed and overall performance of the application.
* **Offline Functionality:** The service worker enables offline access to the application, enhancing the user experience.
* **Better Caching:** Separate CSS files and the service worker can improve browser caching, leading to faster subsequent loads.
* **Enhanced User Experience:** Favicons and a well-structured HTML file contribute to a better overall user experience.
