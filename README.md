# Front End Gulp starter

Simple Front End Gulp starter.  
Provides folder structure and Gulp tasks to easily build anything.  

## Where to start?

In order to start, you will need to have NodeJS, npm, bower and gulp installed globally.  
Then just `git clone`, and change the remote origin to your repo (`git remote set-url origin <Path-To-Your-Repo>`).  
Now you need to install some dependencies, do that with `sudo npm install` and then `bower install`.  
Then run `gulp serve` and open `http://localhost:3000`.  
Go make some front end magic!

## Folder structure

```
app/
  img/
  js/
  less/
  index.html
bower_components/
dist/
gulp/
node_modules/
.bowerrc
.gitignore
bower.json
gulpfile.js
package.json
vendor.json
```

`app` is where all of your source code will live.  
`dist` will hold the compiled code. Gulp will serve the code from here. Don't make changes to files in here, because they are deleted and recompiled on each build.  
`gulp` holds all gulp tasks.

## Gulp workflow

Compiled assets are copied to `dist` folder, from where they can be served.

### Included out of the box

- JQuery
- Bootstrap
- FontAwesome

### Main gulp tasks

- `gulp build` - Builds the assets and copies them to `dist`.
- `gulp serve` - Does the same as `gulp build`, and then starts a local server (`http://localhost:3000`) and starts watchers on .js and .less files.
- `gulp` - Does `gulp serve`.

### Javascript

Gulp will concatenate all your custom javascript code and save it to `dist/js/app.js`.  

### LESS

Gulp will concatenate all your custom less code, compile it to CSS, and save it to `dist/js/app.css`.

### Third party libraries

You can install third party libraries using Bower.  
Gulp will concatenate all vendor javascript files from `bower_components` and save it to `dist/js/vendors.js`.  
Gulp will concatenate all vendor css files from `bower_components` and save it to `dist/css/vendors.css`.  
Since we need to know the order in which the files need to be concatenated (for example, we need to include jQuery before some plugins that depend on it), we define the order in `vendors.json` file.  
So, whenever you add a new lib using Bower, you will need to include it in `vendors.json`.

### Third party LESS

What about third party less files? For example, you added the less version of Bootstrap and want to customize it. In that case, you just need to `@include` the library's less file into your `app.less`, and can use it. And example of this can be seen in `app/less/app.less`.

## Be Awesome.