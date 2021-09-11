import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { RoundService } from '../services/round.service';
const TIPO_SOLO = "SOLO";
const STATUS_EM_ANDAMENTO = "EA";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public nickname = "";
  round = [];
  
  constructor(private loadingController : LoadingController,
              private toastController : ToastController,
              private service : RoundService,
              private router : Router) {}

  async presentLoading(message) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: message
    });
    await loading.present();
  }

  dismissLoading(){
    this.loadingController.dismiss();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async startSolo(){
    await this.presentLoading("Iniciando a partida...");
    let dados = {
      player1: this.nickname,
      tipoPartida: TIPO_SOLO,
      statusRound: STATUS_EM_ANDAMENTO
    }

    this.service.startSolo(dados).toPromise()
      .then(res => {
        this.round = res;        
        this.dismissLoading();
        this.router.navigate(["/round-solo"], {queryParams: {id: res.id}});
      })
      .catch(err => {
        console.error(err);  
        this.presentToast(err.message)
        this.dismissLoading();
      })
    
  }

}
