import { Component, OnInit } from "@angular/core";
import { EarningstatService } from "src/app/services/stat/earning/earningstat.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-card-page-visits",
  templateUrl: "./card-page-visits.component.html",
})
export class CardPageVisitsComponent implements OnInit {

  earningStats : any[] = [];

  initialDate = new Date();

  constructor(private earningStatServices : EarningstatService) {}

  ngOnInit(): void {
    this.loadEarningsPerDate(this.initialDate);
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;

    selectedDate && this.loadEarningsPerDate(selectedDate);

    !selectedDate && Swal.fire({
      title: "Error!",
      text: "Please select a date.",
      icon: "error",
      confirmButtonText: "OK",
    });
  }

  loadEarningsPerDate(selectedDate){
    this.earningStatServices.getDayEarning(selectedDate).then(
      (response : any) => {
        this.earningStats = response?.data || [];
      },
      (error) => {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while fetching the data.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    );
  }
}
