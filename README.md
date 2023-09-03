# Render Markdown

Render Markdown to HTML.

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
