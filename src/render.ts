"use strict";

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { Octokit } from "@octokit/core"

async function render_markdown(markdown: string, octokit: Octokit): Promise<string> {
    const response = octokit.request("POST /markdown", {
        text: markdown,
        headers: {"X-GitHub-Api-Version": "2022-11-28"}
    })

    return response.then(response => response.data.trim())
}

async function render_html(markdown: string, data: any, octokit: Octokit): Promise<string> {
    const title = markdown.split("\n")[0].substring(2)  // Assume the source has "# Title".
    const body = await render_markdown(markdown, octokit)
    const content = {...{title, body}, ...data}

    const template = fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "template.html"), "utf8")
    const keys = Object.keys(content)

    return keys.reduce((text, key) => text.replaceAll(`{{${key}}}`, content[key]),
                       template)
}

async function main(): Promise<void> {
    const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})
    const markdown_file = "README.md"
    const markdown = fs.readFileSync(markdown_file, "utf8")
    const html = await render_html(markdown, {commit: "0".repeat(40)}, octokit)
    console.log(html)
}

export {render_html as html}

if (process.argv[1] === fileURLToPath(import.meta.url)
    && path.parse(process.argv[1]).name === "render") {
    main();
}
