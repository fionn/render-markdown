# Render Markdown

Render Markdown to HTML with minimal CSS.

Example output: [this `README.md` rendered](https://fionn.github.io/md2html-action/).

Marketplace link: [`actions/render-markdown`](https://github.com/marketplace/actions/render-markdown).

## Inputs

* `markdown_file`
  * Optional path to the Markdown file to render. Defaults to `README.md` if not present.

* `token`
  * Optional, to authenticate to the GitHub API. You will likely get rate-limited without this.

## Outputs

* `html`
  * Full HTML document with the body populated by the rendered Markdown.

## Example usage

```yaml
- name: Render markdown
  uses: actions/md2html-action@master
  with:
    token: ${{ github.token }}
    markdown_file: hello.md
```
