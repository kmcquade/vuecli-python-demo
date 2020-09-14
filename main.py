import os
import datetime
import webbrowser
import json
from jinja2 import Environment, FileSystemLoader

__version__ = "0.2.0"


app_bundle_path = os.path.join(os.path.dirname(__file__), "dist", "app.bundle.js")


def get_vendor_bundle_path():
    vendor_bundle_directory = os.path.join(os.path.dirname(__file__), "dist", "js")
    file_list = [
        f for f in os.listdir(vendor_bundle_directory) if os.path.isfile(os.path.join(vendor_bundle_directory, f))
    ]
    file_list_with_full_path = []
    for file in file_list:
        if file.endswith(".js") and file.startswith("chunk-vendors."):
            file_list_with_full_path.append(
                os.path.abspath(os.path.join(vendor_bundle_directory, file))
            )
    if len(file_list_with_full_path) != 1:
        raise Exception("There should only be one vendor file in the directory.")
    else:
        return file_list_with_full_path[0]


class HTMLReport:
    def __init__(self, account_id, account_name):
        self.account_name = account_name
        self.account_id = account_id
        self.report_generated_time = datetime.datetime.now().strftime("%Y-%m-%d")
        # For testing out private data - just to make sure it works without the sampleData
        if os.getenv("PRIVATE"):
            results_file_path = os.path.abspath(
                os.path.join(
                    os.path.dirname(__file__),
                    "private",
                    "demo.json",
                )
            )
        else:
            results_file_path = os.path.abspath(
                os.path.join(
                    os.path.dirname(__file__),
                    "example-iam-data.json",
            )
        )
        with open(results_file_path, 'r') as json_file:
            results = json.load(json_file)

        self.results = f"let iam_data = {json.dumps(results)}"
        # # Otherwise, use the sample data
        # else:
        #     self.results = "console.log('loading sample data for sample report')"

        with open(app_bundle_path, "r") as f:
            self.app_bundle = f.read()
        vendor_bundle_path = get_vendor_bundle_path()
        with open(vendor_bundle_path, "r") as f:
            self.vendor_bundle = f.read()

    def get_html_report(self):
        template_contents = dict(
            vendor_bundle_js=self.vendor_bundle,
            app_bundle_js=self.app_bundle,
            # results
            results=self.results,
            # account metadata
            account_id=self.account_id,
            account_name=self.account_name,
            report_generated_time=self.report_generated_time,
            cloudsplaining_version=__version__,
        )
        template_path = os.path.join(os.path.dirname(__file__))
        env = Environment(loader=FileSystemLoader(template_path))  # nosec
        template = env.get_template("template.html")
        return template.render(t=template_contents)


def generate_html_report():
    if os.getenv("PRIVATE"):
        test_report_path = os.path.join(os.getcwd(), "private.html")
    else:
        test_report_path = os.path.join(os.getcwd(), "index.html")

    html_report = HTMLReport(
        account_id="123456789123",
        account_name="Demo"
    )
    rendered_report = html_report.get_html_report()
    with open(test_report_path, "w") as file:
        file.write(rendered_report)
    print("Opening the HTML report")
    url = "file://%s" % os.path.abspath(test_report_path)
    webbrowser.open(url, new=2)


if __name__ == '__main__':
    generate_html_report()
