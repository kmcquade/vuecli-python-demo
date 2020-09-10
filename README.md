# vuecli-python-demo

## Instructions

### Developing the JavaScript and the report with Vue.js

* Install dependencies first with `npm install`

* Add a new file by putting it under `src/components/*.vue`

* You can insert your JavaScript utility functions under `src/util`

* From the root directory, try running `npm run build` to build the report, or `npm run serve`

#### Unit testing

* Test by running `npm test`

* If you want to add your own tests, just add it to src/test/*-test.js

### Generating a report with Jinja2

```bash
python3 -m venv ./venv && source venv/bin/activate
pip3 install -r requirements.txt
python3 main.py
```

* That will generate a report that leverages `template.html` as the Jinja2 template, and injects the contents of `dist/app.bundle.js`, and `dist/js/chunk-vendors.a60eac2b.js` as variables in that template.

* The example report is in `index.html`


### TODO

#### Report migration
* Principals component
* DataTables
* Navbar - DONE
* Checkbox selection of risk types

#### Templating
* Templating related
    * Right now, the `App.vue` is configured to just include the `src/sampleData.js`, all the time. We don't want this. We want to be able to load the IAM data results in via Jinja after the fact. Need to figure out the best way to do this.

#### Not MVP

* Maybe not MVP?
  * Render the markdown definitions using Vue instead of Jinja2 - this will be cleaner. https://www.npmjs.com/package/vue-simple-markdown
  * The vendor JS bundle is currently leveraging a randomly generated name each time. I think this has to do with my webpack config. Need to fix that - we don't want it to be called `chunk-vendors.a60eac2b.js`.

#### Delivery related
* Delivery related
  * Need to figure out GitHub actions for running the unit tests
  * Need to figure out GitHub actions for verifying that the report is okay on a PR
