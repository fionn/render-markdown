"use strict";

import fs = require("node:fs")
import core = require('@actions/core')
import github = require('@actions/github')
import { Octokit } from "@octokit/core"
import render = require("./render.js")

async function get_repo_user(octokit: Octokit): Promise<any> {
    try {
        var username = github.context.payload.repository.owner.name
    } catch {
        var username = "octocat"
    }

    const response = octokit.request("GET /users/" + username, {
        headers: {"X-GitHub-Api-Version": "2022-11-28"}
    })

    return response.then(response => response.data)
}

async function main(): Promise<void> {
    const token = core.getInput("token") || process.env.GITHUB_TOKEN
    const markdown_file = core.getInput("markdown_file") || "README.md"

    const octokit = new Octokit({auth: token})

    const commit = github.context.sha || "0".repeat(40)
    const user = await get_repo_user(octokit)
    const content = {author: user.name, commit}

    const markdown = fs.readFileSync(markdown_file, "utf8")
    const html = await render.html(markdown, content, octokit)

    core.setOutput("html", html)
}

if (require.main === module) {
    main();
}
