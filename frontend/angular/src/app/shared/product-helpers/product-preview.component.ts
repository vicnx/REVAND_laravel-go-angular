import { Component, Input,Output, EventEmitter, ViewChild, ElementRef, ComponentFactoryResolver, Injector, ApplicationRef, Renderer2, OnInit } from '@angular/core';
import { Product, ProductService } from '../../core';
import { Router } from '@angular/router'
// import { Product, UsersService } from '../../../assets/logo-web.png';

@Component({
  selector: 'app-product-preview',
  styleUrls: ['product-preview.component.css'],
  templateUrl: './product-preview.component.html'
})
export class ProductPreviewComponent implements OnInit{
  @Input() product: Product;
  @Output() refresh_list = new EventEmitter<string>();
  @Output() item = new EventEmitter<Product>();
  constructor ( private productsService: ProductService, private router: Router ){}

  // @Input() test: Product;
  isDeleting = false;
  currentRoute = this.router.url;

  ngOnInit() {
    console.log(this.router.url)
  }

    // deleteProduct() {
      
    //     this.isDeleting = true;
    //     this.productsService.destroy(this.product.ID).subscribe(success => {
            
    //         //enviamos un emit al parent. (lo recoge en product-list component)
    //         this.refresh_list.next();
    //     }
    //     );
    // }


    
    // modify(event) {
    //   let node = event.target;
    //   let nodeParent = node.parentNode.parentNode.parentNode.parentNode;
    //   let editor = nodeParent.querySelector('app-editor-user');
    //   this.item.next();
    //   if (node.classList.contains('oppened')) {
    //     node.classList.remove('oppened');
    //     editor.style.display = 'none'
    //   }else{
    //     node.classList.add('oppened');
    //     editor.style.display = 'unset'
    //   }
    // }

}