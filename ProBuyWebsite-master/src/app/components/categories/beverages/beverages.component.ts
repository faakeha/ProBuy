import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-beverages',
  templateUrl: './beverages.component.html',
  styleUrls: ['./beverages.component.scss']
})
export class BeveragesComponent implements OnInit {

  
  constructor(private service: ProductService, private router2: Router) { }
  errormsg:any;
  successmsg:any;
  get:any;
  isAddtoCart: boolean = false;
  data:any;
  readData:any;
  cocacola:any;
  pepsi:any;
  sprite:any;
  roohafza:any;
  qty:any = '1';
  clicked: boolean = false;
  

  ngOnInit(): void {
    console.log('ngonit working');
    this.getProductsData();

 
    
  }

  getProductsData(){
    console.log('fetching products started');
    this.service.getProducts(12, ["coca cola", "pepsi", "sprite", "rooh afza"]).subscribe((res) => {
      console.log('res>', res.data);
      this.readData = res.data; 
      console.log('readdata>', this.readData);
      this.cocacola = this.readData[0];
      this.pepsi = this.readData[1];
      this.sprite = this.readData[2];
      this.roohafza = this.readData[3];
     // console.log('res>', this.dawn);
  //    console.log('res bunny>', this.bunny);
    }); 
     
    }

    addToCart(prod:any, qty: number){
      if(this.clicked == false){
      this.service.insertIntoCart(prod, qty).subscribe((res) => {
        console.log('res', res.data);
        if(res.message == 'inserted into cart'){
          this.clicked = true;
        }
  
      });
    }
    else if(this.clicked == true){
      this.errormsg = 'Item already added. Go to your cart to change the quantity.';
    }
    this.reloadCurrentRoute();
  
    }

    
  
    

    reloadCurrentRoute() {
      let currentUrl = this.router2.url;
      this.router2.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router2.navigate([currentUrl]);
      });
  }

}
