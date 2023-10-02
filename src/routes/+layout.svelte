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
        <li><a class="btn btn-ghost" href="/">Speed Test</a></li>
        <li><a class="btn btn-ghost" href="/text-comparison">Text Comparison</a></li>
      </ul>
    </div>
  </nav>
  <div class="flex flex-col h-screen">

    <slot />
  </div>

