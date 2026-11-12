<?php

/**
 * Laravel Server Router with Static Asset Caching & Gzip Compression
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?? ''
);

$publicPath = is_dir(__DIR__.'/public') ? __DIR__.'/public' : getcwd();
$filePath = $publicPath.$uri;

// Serve static assets with efficient cache control policy & gzip compression
if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    if (str_starts_with($uri, '/build/') || str_starts_with($uri, '/storage/') || $uri === '/favicon.ico') {
        header('Cache-Control: public, max-age=31536000, immutable');
        header('Vary: Accept-Encoding');
        $ext = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $mimeTypes = [
            'js' => 'application/javascript; charset=utf-8',
            'css' => 'text/css; charset=utf-8',
            'svg' => 'image/svg+xml',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'webp' => 'image/webp',
            'ico' => 'image/x-icon',
            'woff2' => 'font/woff2',
            'woff' => 'font/woff',
            'ttf' => 'font/ttf',
            'json' => 'application/json',
        ];
        if (isset($mimeTypes[$ext])) {
            header('Content-Type: '.$mimeTypes[$ext]);
        }

        $compressable = in_array($ext, ['js', 'css', 'svg', 'json']);
        $acceptsGzip = str_contains($_SERVER['HTTP_ACCEPT_ENCODING'] ?? '', 'gzip');

        if ($compressable && $acceptsGzip && function_exists('gzencode')) {
            $content = file_get_contents($filePath);
            $gzipped = gzencode($content, 6);
            header('Content-Encoding: gzip');
            header('Content-Length: '.strlen($gzipped));
            echo $gzipped;
            exit;
        }

        readfile($filePath);
        exit;
    }
    return false;
}

require_once $publicPath.'/index.php';
