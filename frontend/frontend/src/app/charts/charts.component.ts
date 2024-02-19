import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
//import * as ChartJS  from 'chart.js/auto';
import { UserService } from '../services/user.service';
import { RegRequestService } from '../services/reg_request.service';
import { Chart } from 'chart.js/auto';
import { TeachesService } from '../services/teaches.service';
import { ClassService } from '../services/class.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{

  constructor(private userService:UserService, private regRequestService:RegRequestService, private teachesService:TeachesService,
    private classService:ClassService) {}

  ngOnInit(): void {
    this.userService.getGenderCount().subscribe(resp=>{
      if(!resp) { alert("Error"); return; }
      let genderStudents = document.getElementById('genderStudents') as HTMLCanvasElement;
      let data = {
        labels: ['M','F'],
        datasets: [{data: [resp[0], resp[1]], backgroundColor: ['rgb(54, 162, 235)','rgb(255, 99, 132)']}]
      };
      if(genderStudents != null) {
        new Chart(genderStudents, {type: 'pie', data: data, options: {responsive: false, maintainAspectRatio: false}});
      }

      let genderTutors = document.getElementById('genderTutors') as HTMLCanvasElement;
      data.datasets = [{data: [resp[2], resp[3]], backgroundColor: ['rgb(54, 162, 235)', 'rgb(255, 99, 132)']}];
      if(genderTutors != null) {
        new Chart(genderTutors, {type: 'pie', data: data, options: {responsive: false, maintainAspectRatio: false}});
      }
    })


    this.regRequestService.getAgeCount().subscribe(resp=>{
      if(!resp) { alert("Error"); return; }
      let age = document.getElementById('age') as HTMLCanvasElement;
      let data = {
        labels: ['1-4 grade','5-8 grade','High school'],
        datasets: [{lable: "", data: [resp[0], resp[1], resp[2]], backgroundColor: ['rgba(255, 99, 132, 0.5)']}]
      };
      if(age != null) {
        new Chart(age, {type: 'bar', data: data,
        options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {legend: {display: false}},
          scales: {y: {ticks: {stepSize: 1}}}
        }
        });
      }
    })

    this.teachesService.getSubjects().subscribe(labels=>{
      this.teachesService.getCountForSubjects().subscribe(data=>{
        if(!labels || !data) { alert("Error"); return; }
        let subjects = document.getElementById('subjects') as HTMLCanvasElement;
        if(subjects != null) {
          new Chart(subjects, {type:'bar', data:{labels:labels, datasets:[{data:data, backgroundColor: ['rgba(54, 162, 235, 0.5)']}]}, options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {legend: {display: false}},
            scales: {y: {ticks: {stepSize: 1}}}
          }});
        }
      })
    })

    this.classService.getWeekDayCount().subscribe(resp=>{
      if(!resp) { alert("Error"); return; }
      let weekdays = document.getElementById('weekdays') as HTMLCanvasElement;
      let labels: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      if(weekdays != null) {
        new Chart(weekdays, {type:'bar', data:{labels:labels, datasets:[{data:resp, backgroundColor:'rgb(54, 162, 235)'}]}, options: {
          responsive: false,
          maintainAspectRatio: false,
          //@ts-ignore
          barPercentage: 1,
          categoryPercentage: 1,
          plugins: {legend: {display: false}},
          scales: {y: {ticks: {stepSize: 1}}}
        }});
        
      }
    })

    this.classService.getClassCountForTutor().subscribe(tutors=>{
      if(!tutors) { alert("Error"); return; }
      let months = document.getElementById('months') as HTMLCanvasElement;
      let data: number[][] = [];
      let labels: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let colors = ["rgba(255, 99, 132, 0.7)", "rgba(54, 162, 235, 0.7)", "rgba(255, 205, 86, 0.7)", "rgba(75, 192, 192, 0.7)", "rgba(255, 159, 64, 0.7)", "rgba(75, 192, 192, 0.7)", "rgba(153, 102, 255, 0.7)", "rgba(177, 127, 38, 0.7)", "rgba(201, 203, 207, 0.7)", "rgba(50, 205, 50, 0.7)"];
      let promises = tutors.map(t => 
        firstValueFrom(this.classService.getMonthCountForTutor(t))
      );
      Promise.all(promises).then(responses => {
        responses.forEach((resp, index) => {
          data.push(resp);
          if (index === tutors.length - 1) {
            new Chart(months, {
              type: 'line',
              data: {
                labels: labels,
                datasets: tutors.map((tutor, i) => ({
                  label: tutor,
                  data: data[i],
                  borderWidth: 2,
                  fill: false,
                  borderColor: colors[i],
                  backgroundColor: colors[i]
                }))
              },
              options: {
                responsive: false,
                maintainAspectRatio: false,
                plugins: {legend: {position: 'right'}},
                scales: {y: {ticks: {stepSize: 1}}}
              }
            });
          }
        });
      })
    })

    this.classService.getDoubleTimeCount().subscribe(resp=>{
      if(!resp) { alert("Error"); return; }
      let doubletime = document.getElementById('doubletime') as HTMLCanvasElement;
      let data = {
        labels: ['Yes','No'],
        datasets: [{data: [resp[0], resp[1]], backgroundColor: ['rgb(54, 162, 235)','rgb(255, 99, 132)']}]
      };
      if(doubletime != null) {
        new Chart(doubletime, {type: 'pie', data: data, options: {responsive: false, maintainAspectRatio: false}});
      }
    })

    this.classService.getReviewStatistics().subscribe(resp=>{
      let reviews = document.getElementById('reviews') as HTMLCanvasElement;
      if(reviews) new Chart(reviews, {
        type: 'bar',
        data: {
            labels: ['Left a review', 'Did not leave a review'],
            datasets: [{
                label: 'Tutors', 
                data: [resp[0], resp[1]]
            }, {
                label: 'Students',
                data: [resp[2], resp[3]]
            }]
        }, options: {responsive: false, maintainAspectRatio: false}
      });
    })


  }
    

}
