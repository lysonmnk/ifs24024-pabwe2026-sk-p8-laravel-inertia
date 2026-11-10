<?php

namespace App\Features\Ai\Contracts;

use App\Features\Ai\DTO\GeneratedPostItem;

interface AiClientInterface
{
    /**
     * @return array<GeneratedPostItem>
     */
    public function generateArticles(string $topic, string $category, int $count = 1): array;
}

