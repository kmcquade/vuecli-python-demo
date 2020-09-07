
* Install Vue CLI
```bash
npm install -g @vue/cli
# Install the global add-on that allows you to prototype single .vue files
 yarn global add @vue/cli-service-global
```

* Create the Vue Project

```bash
vue create my-project
```


23

I use html-webpack-plugin inject the output from Webpack into a index.html file.

Assuming you mean you want to inline all those files into one http request of index.html you can use html-webpack-inline-source-plugin to achieve this.