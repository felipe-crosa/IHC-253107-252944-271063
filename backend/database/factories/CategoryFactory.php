<?php

declare(strict_types=1);

namespace Database\Factories;

use IHC\Backoffice\Events\Domain\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use IHC\Backoffice\Users\Domain\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<User>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'description' => fake()->text(),
        ];
    }
}
