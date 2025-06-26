<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\UserFactory;
use IHC\Backoffice\Events\Domain\Models\Category;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Socials',
            'description' => 'Events related to social gatherings and activities.'
        ]);
        Category::create([
            'name' => 'Sports',
            'description' => 'Events related to sports and athletic activities.'
        ]);
        Category::create([
            'name' => 'Food',
            'description' => 'Events related to food and culinary experiences.'
        ]);
        Category::create([
            'name' => 'Music',
            'description' => 'Events related to music and concerts.'
        ]);
        Category::create([
            'name' => 'Travel',
            'description' => 'Events related to travel and exploration.'
        ]);
        Category::create([
            'name' => 'Movies',
            'description' => 'Events related to movies and film screenings.'
        ]);
        Category::create([
            'name' => 'Games',
            'description' => 'Events related to gaming and esports.'
        ]);
        Category::create([
            'name' => 'Other',
            'description' => 'Events that do not fit into other categories.'
        ]);
    }
}
