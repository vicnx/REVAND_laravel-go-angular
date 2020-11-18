<?php

namespace App\Resolvers\Transformers;

class SubscriptionTransformer extends Transformer
{
    protected $resourceName = 'subscription';

    public function transform($data)
    //data es la subscripcion pasada, indicamos los campos que queremos que nos retorne
    {
        return [
            'id'                => $data['id'],
            'name'              => $data['name'],
            'price'             => $data['price'],
            'created_at'        => $data['created_at'],
        ];
    }
}