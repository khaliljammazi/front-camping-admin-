import { Component, OnInit } from '@angular/core';
import { ProductCommand } from 'src/app/models/command';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommandService } from '../../../../services/command.service';
import { Command } from '../../../../models/command';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-command',
  templateUrl: './add-command.component.html',
  styleUrls: ['./add-command.component.scss']
})
export class AddCommandComponent implements OnInit {
  productCommands: ProductCommand[] = [];

  editCommandForm!: FormGroup;
  commandId!: number;
  command!: Command;
  constructor(
    private formBuilder: FormBuilder,
    private commandService: CommandService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
      this.editCommandForm = this.formBuilder.group({
        customerFirstName: ['', Validators.required],
        customerLastName: ['', Validators.required],
        customerEmail: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        shippingAddress: ['', Validators.required],
        method: ['', Validators.required],
        confirmed: [false],
      });
    }

  ngOnInit(): void {
  
    this.route.params.subscribe((params) => {
      this.commandId = +params['id']; // Get the command ID from the route parameters

      // Fetch the command data based on the command ID
      this.commandService.getCommandById(this.commandId).subscribe(
        (response: Command) => {
          this.command = response;
          this.populateFormFields(); // Populate the form fields with the command data
        },
        (error: any) => {
          console.error('Error fetching command', error);
        }
      );
    });
  }
  populateFormFields(): void {
    if (this.command) {
      this.editCommandForm.patchValue({
        customerFirstName: this.command.customerFirstName,
        customerLastName: this.command.customerLastName,
        customerEmail: this.command.customerEmail,
        phoneNumber: this.command.phoneNumber,
        shippingAddress: this.command.shippingAddress,
        method: this.command.method,
        confirmed:this.command.confirmed
      });
    }
  }
  saveEditedCommand(): void {
    if (this.editCommandForm.valid) {
      const editedCommand: Command = {
        id: this.command.id, // Keep the original command ID
        ...this.editCommandForm.value, // Update other properties with the form values
      };

      this.commandService.updateCommand(this.commandId, editedCommand).subscribe(
        (response: Command) => {
          Swal.fire({
            title: 'Success',
            text: 'Command updated successfully!',
            icon: 'success',
          });
          this.router.navigate(['/admin/ecommerces/commands']); // Redirect to the commands list page
        },
        (error: any) => {
          console.error('Error updating command', error);
        }
      );
    }
  }

}
