import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-oilnghee',
  templateUrl: './oilnghee.component.html',
  styleUrls: ['./oilnghee.component.scss']
})
export class OilngheeComponent implements OnInit {

  constructor(private service: ProductService, private router2: Router) { }
  errormsg:any;
  successmsg:any;
  get:any;
  isAddtoCart: boolean = false;
  data:any;
  readData:any;
  canolive:any;
  dalda:any;
  sufi:any;
  qty:any = '1';
  clicked: boolean = false;

  ngOnInit(): void {
    console.log('ngonit working');
    this.getProductsData();

 
    
  }

  getProductsData(){
    console.log('fetching products started');
    this.service.getProducts(5, ["canolive", "dalda", "sufi"]).subscribe((res) => {
      console.log('res>', res.data);
      this.readData = res.data; 
      console.log('readdata>', this.readData);
      this.canolive = this.readData[0];
      this.dalda = this.readData[1];
      this.sufi = this.readData[2];
      console.log('res>', this.dalda);
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
