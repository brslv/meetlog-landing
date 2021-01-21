module.exports = function _topBar() {
  return `
<div class="top-bar">
  <div class="brand">
      <a href="/" title="Meetlog :: Meeting logs. Simplified."><img src="/images/logo.svg" alt="Meetlog logo"/></a>
  </div>
  <div class="top-bar-meetlog">
    <img src="/images/meetlog.svg" alt="Meetlog"/>
  </div>
  <div>
    <a href="/blog" title="Meetlog blog" class="top-bar-link">Blog</a>
  </div>
</div>
  `;
}
