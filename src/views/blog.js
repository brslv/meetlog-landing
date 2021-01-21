const _layout = require('./_layout');
const _topBar = require("./partials/_topBar.js");

module.exports = function blog({ title, articles }) {
  const _title = `Meetlog :: ${title}`;
  const content = `
    <div class="blog">
      ${_topBar()}
      <div class="blog-container">
        <h2>Latest articles</h2>
        <section class="blog-articles-container">
        ${articles.map(article => {
          return `
            <article class="blog-article">
              <h1 class="blog-article-title mt-0"><a href="/blog/article/${article.slug}">${article.title}</a></h1>
              <blockquote class="blog-article-excerpt">${article.excerpt}</blockquote>
            </article>
          `;
        }).join('\n')}
        </section>
      </div>
    </div>
  `;

  return _layout({ content, title: _title });
}
