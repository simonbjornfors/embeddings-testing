<script>
  import "../app.postcss";
</script>
  <nav class="navbar bg-primary text-primary-content px-6">
    <div class="navbar-start text-2xl font-bold">
      <a href="/">Embeddings</a>
    </div>
    <div class="navbar-center">
    </div>
    <div class="navbar-end">
      <ul class="menu menu-horizontal"> 
        <li><a class="btn btn-ghost" href="/e5-small-v2">e5-small-v2</a></li>
        <li><a class="btn btn-ghost" href="/openai-ada-002">OpenAi Ada 002</a></li>
      </ul>
    </div>
  </nav>
  <slot />

