"use strict";

import fs = require("node:fs")
import path = require('node:path')
import { Octokit } from "@octokit/core"

function get_title(markdown: string): string {
    // Assume the source has "# Title".
    return markdown.split("\n")[0].substring(2)
}

async function render_markdown(markdown: string, octokit: Octokit): Promise<string> {
    const response = octokit.request("POST /markdown", {
        text: markdown,
        headers: {"X-GitHub-Api-Version": "2022-11-28"}
    })

    return response.then(response => response.data.trim())
}

function render_template(template_file: string, data): string {
    const template = fs.readFileSync(template_file, "utf8")
    const keys = Object.keys(data)
    return keys.reduce((text, key) => text.replaceAll(`{{${key}}}`, data[key]),
                       template)
}

async function render_html(markdown: string, data: any, octokit: Octokit): Promise<string> {
    const title = get_title(markdown)
    const body = await render_markdown(markdown, octokit)
    const content = {...{title, body}, ...data}
    const template_path = path.join(__dirname, "..", "src", "template.html")
    return render_template(template_path, content)
}

async function main(): Promise<void> {
    const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})
    const markdown_file = "README.md"
    const markdown = fs.readFileSync(markdown_file, "utf8")
    const html = await render_html(markdown, {commit: "0".repeat(40)}, octokit)
    console.log(html)
}

export {render_html as html}

if (require.main === module) {
    main();
}
