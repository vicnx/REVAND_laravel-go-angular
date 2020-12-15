<?php

namespace App\Resolvers\Transformers;

class UserTransformer extends Transformer
{
    protected $resourceName = 'user';
    
    public function transform($data)
    {
        return [
            'email'     => $data['email'],
            'token'     => $data['token'],
            'username'  => $data['username'],
            'image'  => $data['image'],
            'provider'  => $data['provider'],
            'type'  => $data['type'],
            'bio'  => $data['bio'],
        ];
    }
}