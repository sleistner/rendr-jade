rendr-jade
================

!! This is still an experimental project.

[jade](http://jade-lang.com/) template adapter for [Rendr](https://github.com/airbnb/rendr) apps.


### 1) Set the default templateAdapter to rendr-jade

./app/app.js

```
    module.exports = BaseApp.extend({
        defaults: {
            templateAdapter: 'rendr-jade'
        },
        ...
    });
```

### 2)  Add grunt task

- Install the grunt task
[grunt-contrib-jade](https://github.com/gruntjs/grunt-contrib-jade)
```
    jade: {
      compile: {
        options: {
          processName: function(filename) {
            return filename.replace('app/templates/', '').replace(/(.jade)/, '');
          },
          client: true,
          node: true
        },
        src: ["app/templates/**/*.jade"],
        dest: "app/templates/compiledTemplates.js"
      }
    },
```

### Helpers methods.
helpers are binded to locals context, can are called as a function

e.g.
```
html(lang="en")
  head
  body
    != view('header', { title: appData.title })

    .main#page(role="main")
      .container.mvxl#content
        != body
```
