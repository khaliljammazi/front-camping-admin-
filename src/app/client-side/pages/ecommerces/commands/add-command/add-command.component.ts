import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommandService } from '../../../../../services/command.service';
import { Command, ProductCommand } from '../../../../../models/command';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.scss'],
})
export class AddCommandComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;
  
  newCommandForm: FormGroup;
  productCommands: ProductCommand[] = [];
  paymentMethod = "pm_card_visa";
  product: any;
  quantity: any;
  priceTotal: any;
  command!:Command;
  commandId!:any;
  res!:any
  constructor(
    private formBuilder: FormBuilder,
    private commandService: CommandService,
    private router: Router,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.newCommandForm = this.formBuilder.group({
      customerFirstName: ['', Validators.required],
      customerLastName: ['', Validators.required],
      customerEmail: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      shippingAddress: ['', Validators.required],
      method: ['', Validators.required],
      Numbercard: ['', Validators.required],
      HolderName: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData(); 
  }

  loadData(): void {
    this.productCommands = this.shoppingCartService.getDataFromService();
    if (this.productCommands.length > 0) {
     
      this.product = this.productCommands[0]?.product;
      this.quantity = this.productCommands[0]?.quantity;
      this.priceTotal = this.productCommands[0]?.priceTotal;
      console.log("data", this.productCommands);
    }
  }

  saveCommand(): void {
    console.log('Save clicked');
    if (this.productCommands.length === 0) {
      console.log('No product commands to save.');
      return;
    }

    this.command = {
      customerFirstName: this.newCommandForm.value.customerFirstName,
      customerLastName: this.newCommandForm.value.customerLastName,
      customerEmail: this.newCommandForm.value.customerEmail,
      productCommands: this.productCommands,
      phoneNumber: this.newCommandForm.value.phoneNumber,
      shippingAddress: this.newCommandForm.value.shippingAddress,
      method: this.newCommandForm.value.method,
    
    };

   

    this.commandService.addCommand(this.command).subscribe(
      (response: Command) => {
      this.commandId=response.id
      this.res=response
      Swal.fire({
        title: 'Personal Information Saved',
        text: 'Please proceed to payment.',
        icon: 'info',
      });
      
      },
      (error: any) => {
        console.error('Error adding command', error);
      }
    );
   
  }

  payment() {
   
    
    const productCommand = {
      
      command:{
        id:this.commandId
      },
      product: this.product,
      quantity: this.quantity,
      priceTotal: this.priceTotal,
      
    };
    
    this.commandService.makePayment(productCommand, 'pm_card_visa').subscribe(
      (response: any) => {
       
      }
      
    );
    Swal.fire({
      title: 'Success',
      text: 'Command added successfully!',
      icon: 'success',
    })
  }
  downloadBill() {
        // Get the content to be converted to PDF
        const content = this.pdfContent.nativeElement;

        // Generate PDF with higher resolution (scale: 2)
        html2canvas(content, { scale: 2 }).then(canvas => {
          const pdfWidth = 210; // A4 width in mm
          const pdfHeight = 297; // A4 height in mm
    
          // Calculate image dimensions with higher resolution
          const imgWidth = pdfWidth - 40;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
          // Create a new PDF
          const pdf = new jsPDF('p', 'mm', [pdfWidth, pdfHeight]);
    
          // Set the DPI
          //const dpi = 300;
          //pdf.setDPI(dpi);
    
          const imgData = canvas.toDataURL('image/png');
    
          // Add the image to the PDF
          pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    
          // Download the PDF
          pdf.save('bill.pdf');
      });
  

  }
  

}
