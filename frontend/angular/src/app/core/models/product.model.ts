import { Identifiers } from '@angular/compiler';
import { Profile } from './profile.model';

export interface Product {
    _id: Identifiers;
    Slug: String,
    Name: String;
    Description: String;
    Images: String;
    Price: String;
    AuthorID: String;
    Author: Profile;
}

export interface ProductListConfig {
    type: string,
    filters: {
        authorid?: string,
        limit?: number,
        offset?: number
    };
}
