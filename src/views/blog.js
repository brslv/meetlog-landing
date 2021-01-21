const _layout = require('./_layout')
const _topBar = require('./partials/_topBar.js')

module.exports = function blog({ title, articles }) {
  const _title = `Meetlog :: ${title}`
  const content = `
    <div class="blog">
      ${_topBar()}
      <main class="blog-container">
        <section class="blog-featured-container">
          <h2 class="title">Latest article <span role="image">😍</span></h2>
          
          <a href="/blog/article/${articles[0].slug}" class="blog-article">
            <article>
              <h1 class="blog-article-title mt-0">${articles[0].title}</h1>
              <blockquote class="blog-article-excerpt">${articles[0].excerpt}</blockquote>
            </article>
          </a>
        </section>

        <section class="blog-articles-container">
          <h3 class="title">Older articles</h3>
          <div class="articles">
        ${articles.slice(1)
          .map(article => {
            return `
    <a href="/blog/article/${article.slug}" class="blog-article">
              <article>
              <h1 class="blog-article-title mt-0">${article.title}</h1>
              <blockquote class="blog-article-excerpt">${article.excerpt}</blockquote>
            </article>
            </a>
          `
          })
          .join('\n')}
          </div>
        </section>
      </main>
    </div>
  `

  return _layout({ content, title: _title })
}
