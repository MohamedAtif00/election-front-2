import { Component, OnInit } from '@angular/core';
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { CandidateService } from '../../../shared/service/candidate.service';

interface candidateChart{
  name:string,
  votes:number
}

@Component({
  selector: 'app-candidate-bar-chart',
  templateUrl: './candidate-bar-chart.component.html',
  styleUrls: ['./candidate-bar-chart.component.css']
})
export class CandidateBarChartComponent   {
  
  data: any;
  options: any;

  candidates:candidateChart[]= [];
  


  constructor(private candidateServ:CandidateService){}



  ngOnInit() {
     this.loadCandidate()
  }


  makeConfig()
  {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    // Prepare data dynamically based on candidates
    this.data = {
      labels: this.candidates.map(candidate => candidate.name),
      datasets: [
        {
          label: 'Statistics',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: this.candidates.map(candidate => candidate.votes)
        }
      ]
    };

    this.options = {
      indexAxis: 'y',
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500
            }
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  loadCandidate()
  {
    this.candidateServ.GetAllCandidates().subscribe(data=>{
      console.log(data);
      this.candidates = data
      this.makeConfig()
    })
  }



}
