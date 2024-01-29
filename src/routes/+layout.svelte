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
        <li><a class="btn btn-ghost" href="/similarity-test">Similarity Test</a></li>
      </ul>
    </div>
  </nav>
  <div class="dropdown">
    <div tabindex="0" role="button" class="btn m-1">
      Theme
      <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path></svg>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul tabindex="0" class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
      <li>
        <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Default" value="default"/>
      </li>
      <li>
        <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light"/>
      </li>
      <li>
        <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro"/>
      </li>
      <li>
        <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk"/>
      </li>
      <li>
        <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine" value="valentine"/>
      </li>
      <li>
        <input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua" value="aqua"/>
      </li>
    </ul>
  </div>
  <div class="flex flex-col h-screen">

    <slot />
  </div>

