<?php

use Illuminate\Database\Seeder;

class DummyDataSeeder extends Seeder
{
    protected $totalAwards = 5;


    public function run(\Faker\Generator $faker)
    {
        $awards = factory(\App\Models\Award::class)->times($this->totalAwards)->create();
    }
}
