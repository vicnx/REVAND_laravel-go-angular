<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

// use App\Award;
// use Faker\Generator as Faker;

$factory->define(App\Models\Award::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name(),
        'description' => $faker->text(),
        'image' => $faker->imageUrl(360, 360, null, true),
    ];
});
