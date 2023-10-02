<script>
  import "../app.postcss";
</script>
  <nav class="navbar bg-primary text-primary-content w-screen">
    <div class="navbar-start">
      <a class="btn btn-ghost text-2xl font-bold" href="/">Embeddings</a>
    </div>
    <div class="navbar-center">
    </div>
    <div class="navbar-end mr-3">
      <ul class="menu menu-horizontal"> 
        <li><a class="btn btn-ghost" href="/">Speed Test</a></li>
        <li><a class="btn btn-ghost" href="/text-comparison">Text Comparison</a></li>
      </ul>
    </div>
  </nav>
  <div class="flex flex-col h-screen">

    <slot />
  </div>

