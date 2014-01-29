rendr-jade
================

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
        dest: "app/templates/compiledTemplates.js",
        filter: function(filepath) {
          var filename = path.basename(filepath);
          // Exclude files that begin with '__' from being sent to the client,
          // i.e. __layout.hbs.
          return filename.slice(0, 2) !== '__';
        }
      }
    },
```

### Helpers methods are about tricky.
helpers needs to be invoked with locals as context.

e.g.
```
html(lang="en")
  head
  body
    != view.call(locals, 'header', { title: appData.title })

    .main#page(role="main")
      .container.mvxl#content
        != body
```
