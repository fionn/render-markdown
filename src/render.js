#!/usr/bin/env node

"use strict";

const fs = require("node:fs")
const path = require('node:path')
const { Octokit } = require("@octokit/core")

function get_title(markdown) {
    // Assume the source has "# Title".
    return markdown.split("\n")[0].substring(2)
}

async function render_markdown(markdown, octokit) {
    const response = octokit.request("POST /markdown", {
        text: markdown,
        headers: {"X-GitHub-Api-Version": "2022-11-28"}
    })

    return response.then(response => response.data.trim())
}

function render_template(template_file, data) {
    const template = fs.readFileSync(template_file, "utf8")
    const keys = Object.keys(data)
    return keys.reduce((text, key) => text.replaceAll(`{{${key}}}`, data[key]),
                       template)
}

async function render_html(markdown, data, octokit) {
    const title = get_title(markdown)
    const body = await render_markdown(markdown, octokit)
    const content = {...{title, body}, ...data}
    const template_path = path.join(__dirname, "template.html")
    return render_template(template_path, content)
}

async function main() {
    const octokit = new Octokit({auth: process.env.GITHUB_TOKEN})
    const markdown_file = "README.md"
    const markdown = fs.readFileSync(markdown_file, "utf8")
    const html = await render_html(markdown, {commit: "0".repeat(40)}, octokit)
    console.log(html)
}

module.exports = {html: render_html}

if (require.main === module) {
    main();
}
