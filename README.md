# Render Markdown

Render Markdown to HTML in CI with minimal CSS.

Example output: [this `README.md` rendered](https://fionn.github.io/render-markdown/).

## Usage

### Inputs

* `markdown_file`
  * Optional path to the Markdown file to render. Defaults to `README.md` if not present.

* `token`
  * Optional, to authenticate to the GitHub API. You will likely get rate-limited without this.

### Outputs

* `html`
  * Full HTML document with the body populated by the rendered Markdown.

### Example

```yaml
- name: Render markdown
  uses: fionn/render-markdown@master
  with:
    token: ${{ github.token }}
    markdown_file: example.md
```
