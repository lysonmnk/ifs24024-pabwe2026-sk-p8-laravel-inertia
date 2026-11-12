<!DOCTYPE html>
<html lang="id" xml:lang="id">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="Blog Editorial Systems - Platform publikasi artikel dan ruang editorial modern berbasis Laravel dan Inertia.js.">
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
        <title inertia>{{ config('app.name', 'Blog') }}</title>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>">


        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#F1F0F7] text-[#14122B] min-h-screen">
        @inertia
    </body>
</html>

