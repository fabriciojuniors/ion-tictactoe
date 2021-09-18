import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { RoundService } from '../services/round.service';
const TIPO_DUO = "DUO";
const STATUS_EM_ANDAMENTO = "EA";
const STATUS_AGUARDANDO_OPONENTE = "AO";
@Component({
  selector: 'app-selecao-sala',
  templateUrl: './selecao-sala.page.html',
  styleUrls: ['./selecao-sala.page.scss'],
})
export class SelecaoSalaPage implements OnInit {
  nickname = "";
  round = {
    id: 0,
    player1: "",
    player2: "",
    statusRound: {
      descricao: ""
    },
    winner: null,
    next: null,
    board: [
      [
        "",
        "",
        ""
      ],
      [
        "",
        "",
        ""
      ],
      [
        "",
        "",
        ""
      ]
    ],
    tipoPartida: {
      descricao: ""
    },
    codigo: 0,
    gameOver: false
  };
  codSala = "";
  constructor(private route : ActivatedRoute,
              private service: RoundService,
              private loadingController : LoadingController,
              private toastController: ToastController,
              private router : Router) { }

  ngOnInit() {
    this.codSala = "";
    this.route.queryParams.subscribe(params => {
      this.nickname = params.nickname;
    })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

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

  getRoundStatus(descricao) {
    switch (descricao) {
      case "Em andamento":
        return "EA"
        break;
      case "Finalizado":
        return "FI"
        break;
      case "Aguardando oponente":
        return "AO"
        break;        
    }
  }

  entrar(){
    this.service.getById(this.codSala).toPromise()
    .then(res => {
      this.round = res;        
      if(this.round.statusRound.descricao == "Finalizada"){
        this.presentToast("Partida já finalizada");
        this.codSala = "";
        this.router.navigateByUrl("home")  
      }
      if(this.round.statusRound.descricao == "Em andamento"){
        this.presentToast("Partida em andamento");
        this.codSala = "";
        this.router.navigateByUrl("home")  
      }
      if(this.round.statusRound.descricao == "Aguardando oponente"){
        let newRound = {
          id: this.round.id,
          player1: this.round.player1,
          player2: this.nickname,
          statusRound: this.getRoundStatus("Em andamento"),
          winner: this.round.winner,
          board: this.round.board,
          tipoPartida: "DUO",
          codigo: this.round.codigo,
          gameOver: this.round.gameOver,
          next: this.round.next
        }
    
        this.service.update(newRound).toPromise()
          .then(res => {
            this.round = res;
            this.router.navigate(["/round-multiplayer"], {queryParams: {id: this.round.id, nickname: this.round.player2}});
          })
          .catch(err => {
            console.log(err);
          })
      }

    })
    .catch(err => {
      this.presentToast(err.message);
      this.router.navigateByUrl("home")
    })
  }

  async iniciar(){
    await this.presentLoading("Iniciando a partida...");
    let dados = {
      player1: this.nickname,
      tipoPartida: TIPO_DUO,
      statusRound: STATUS_AGUARDANDO_OPONENTE
    }

    this.service.startSolo(dados).toPromise()
      .then(res => {
        this.round = res;        
        this.dismissLoading();
        this.router.navigate(["/lobby"], {queryParams: {id: res.id}});
      })
      .catch(err => {
        console.error(err);  
        this.presentToast(err.message)
        this.dismissLoading();
      })
  }

}
