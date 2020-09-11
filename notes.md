
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



## Raw loader for rendering markdown files

If you're fine bundling the markdown text in with your client app code, you can just stick raw-loader into your setup and tell webpack to apply it to anything ending matching /\\.md$/i, that would let you use mdParser on the client side. This presumes of course that Bio.md is in the same folder as this JS file during build time.

https://stackoverflow.com/questions/51164901/react-js-load-markdown-file-from-system-as-string#answer-51165441


* Remove raw loader, using this instead https://github.com/peerigon/markdown-loader/issues/43